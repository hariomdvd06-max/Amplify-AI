// premium app.js

const SUPABASE_URL = 'https://czcnnzejcjzdvxydiuoc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Y25uemVqY2p6ZHZ4eWRpdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMjEzMjksImV4cCI6MjA4ODY5NzMyOX0.9m_wlli-JIDWiGggCW0gihtW1h2QJ8AW1J01XGQupX8';
const GEMINI_KEY = 'AIzaSyA8SWj9OCSF41-kSaVZ7cbHEoft2GdMU3o';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. STATE & STORAGE
const state = {
    user: null,
    campaigns: [],
    schedules: [],
    currentView: 'landing',
    activeNav: 'dashboard',
    isSyncing: false
};

const navigation = [
    { name: 'Terminal', id: 'dashboard', icon: 'layout-dashboard' },
    { name: 'Goals', id: 'campaign', icon: 'target' },
    { name: 'Nebula Engine', id: 'generator', icon: 'wand-2' },
    { name: 'Propulsion', id: 'scheduler', icon: 'rocket' },
    { name: 'Intelligence', id: 'analytics', icon: 'bar-chart-3' },
];

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
    // Render static elements
    renderSidebar();
    
    // Check real Supabase session
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (session) {
        state.user = session.user;
        await syncCloudData();
        navigate('app');
        navigateApp('dashboard');
    } else {
        navigate('landing');
    }
    
    // Smooth reveal
    document.body.classList.remove('hidden');
    lucide.createIcons();
});

// 3. CORE NAVIGATION
function navigate(view) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.add('hidden');
        p.style.opacity = '0';
    });
    
    const target = document.getElementById(`page-${view}`);
    if (view === 'login' || view === 'register') {
        document.getElementById('page-auth').classList.remove('hidden');
        setupAuthPage(view);
    } else {
        target.classList.remove('hidden');
    }

    // Trigger animation
    setTimeout(() => {
        const activePage = document.querySelector(`.page:not(.hidden)`);
        if (activePage) activePage.style.opacity = '1';
    }, 10);
    
    state.currentView = view;
    lucide.createIcons();
}

function navigateApp(view) {
    const container = document.getElementById('app-content');
    const template = document.getElementById(`tmpl-${view}`);
    const titleEl = document.getElementById('view-title');
    
    if (template) {
        // Fade out
        container.style.opacity = '0';
        
        setTimeout(() => {
            container.innerHTML = '';
            container.appendChild(template.content.cloneNode(true));
            
            // Update UI strings
            const navItem = navigation.find(n => n.id === view);
            titleEl.textContent = navItem ? navItem.name : view.charAt(0).toUpperCase() + view.slice(1);
            
            updateSidebarActive(view);
            
            // Custom Logic
            if (view === 'dashboard') {
                document.getElementById('dash-camp-count').textContent = state.campaigns.length;
                renderAnalytics(); 
            } else if (view === 'scheduler') {
                renderScheduler();
            } else if (view === 'analytics') {
                setTimeout(renderAnalytics, 100);
            }
            
            lucide.createIcons();
            container.style.opacity = '1';
        }, 200);
    }
}

// 4. AUTH LOGIC
function setupAuthPage(type) {
    const isReg = (type === 'register');
    document.getElementById('auth-title').textContent = isReg ? 'Create Identity' : 'Secure Login';
    document.getElementById('auth-submit-btn').textContent = isReg ? 'Initialize Account' : 'Authenticate';
    document.getElementById('name-field-container').classList.toggle('hidden', !isReg);
    document.getElementById('auth-switch-text').textContent = isReg ? 'Known Node?' : 'New Node?';
    document.getElementById('auth-switch-link').textContent = isReg ? 'Sign In' : 'Register';
}

function toggleAuthMode() {
    const isLogin = document.getElementById('auth-title').textContent === 'Secure Login';
    setupAuthPage(isLogin ? 'register' : 'login');
}

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value;
    const isReg = document.getElementById('auth-title').textContent === 'Create Identity';
    
    const btn = document.getElementById('auth-submit-btn');
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin mr-2">🌀</span> Processing...`;

    try {
        let result;
        if (isReg) {
            // Sign Up with Name Metadata
            result = await supabaseClient.auth.signUp({ 
                email, 
                password,
                options: {
                    data: { full_name: name || email.split('@')[0] }
                }
            });
            
            // Helpful note for email confirmation
            if (result.data && !result.data.session && !result.error) {
                alert("✨ Registration Successful! \n\nIMPORTANT: Check your email to confirm your account before logging in. \n(Note: You can disable this in Supabase Dashboard > Auth > Settings > Confirm Email)");
            }
        } else {
            // Login
            result = await supabaseClient.auth.signInWithPassword({ email, password });
        }

        if (result.error) throw result.error;

        if (result.data.session) {
            state.user = result.data.user;
            await syncCloudData();
            navigate('app');
            navigateApp('dashboard');
        }
    } catch (err) {
        if (err.message.includes("email rate limit exceeded")) {
            alert("⚠️ Supabase Rate Limit: Too many attempts! \n\nFIX: Go to Supabase Dashboard > Auth > Settings and DISABLE 'Confirm Email'. This will let you sign up instantly without waiting for emails.");
        } else if (err.message.includes("Invalid login credentials")) {
            alert("❌ Error: Invalid Credentials. \n\nTip: If you are new here, click 'Create Account' at the bottom first!");
        } else {
            alert("Auth Error: " + err.message);
        }
    } finally {
        btn.disabled = false;
        btn.innerHTML = isReg ? 'Initialize Account' : 'Authenticate';
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    state.user = null;
    navigate('landing');
}

async function syncCloudData() {
    if (!state.user || state.isSyncing) return;
    state.isSyncing = true;
    
    try {
        // Parallel fetching for speed
        const [camps, sched] = await Promise.all([
            supabaseClient.from('campaigns').select('*').eq('user_id', state.user.id),
            supabaseClient.from('schedules').select('*').eq('user_id', state.user.id).order('timestamp', { ascending: false })
        ]);

        if (!camps.error) state.campaigns = camps.data;
        if (!sched.error) state.schedules = sched.data;
        
        // Refresh UI
        if (state.currentView === 'app') {
            navigateApp(state.activeNav || 'dashboard');
        }
    } catch (e) {
        console.error("Sync failed", e);
    } finally {
        state.isSyncing = false;
    }
}

// 5. UI HELPERS
function renderSidebar() {
    const desktopNav = document.getElementById('sidebar-nav');
    const mobileNav = document.getElementById('mobile-nav');
    
    const html = navigation.map(item => `
        <button onclick="navigateApp('${item.id}')" id="nav-${item.id}" class="flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all text-slate-400 hover:text-white hover:bg-white/5 group">
            <i data-lucide="${item.icon}" class="flex-shrink-0 mr-4 h-5 w-5 transition-transform group-hover:scale-110"></i>
            <span>${item.name}</span>
        </button>
    `).join('');
    
    desktopNav.innerHTML = html;
    mobileNav.innerHTML = html;
}

function updateSidebarActive(id) {
    document.querySelectorAll('[id^="nav-"]').forEach(el => {
        el.classList.remove('bg-primary/10', 'text-primary', 'border', 'border-primary/20');
        el.classList.add('text-slate-400');
    });
    
    const activeBtn = document.getElementById(`nav-${id}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-primary/10', 'text-primary', 'border', 'border-primary/20');
        activeBtn.classList.remove('text-slate-400');
    }
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// 6. CAMPAIGN LOGIC
async function handleCreateCampaign(e) {
    e.preventDefault();
    const name = document.getElementById('camp-name').value;
    const platform = document.getElementById('camp-platform').value;
    const goals = document.getElementById('camp-goals').value;
    
    const { data, error } = await supabaseClient
        .from('campaigns')
        .insert([{ name, platform, goals, user_id: state.user.id }])
        .select();

    if (error) {
        alert("DB Error: " + error.message);
    } else {
        state.campaigns.unshift(data[0]);
        alert(`Success: Mission registered to the Cloud.`);
        navigateApp('dashboard');
    }
}

// 7. NEBULA ENGINE (AI GENERATOR)
async function handleGenerate(e) {
    e.preventDefault();
    const topic = document.getElementById('gen-topic').value;
    const platform = document.getElementById('gen-platform').value;
    const tone = document.getElementById('gen-tone').value;
    const btn = document.getElementById('gen-btn');
    const output = document.getElementById('gen-output');

    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin mr-3">🌀</span> Interfacing Neural Paths...`;
    
    output.innerHTML = `
        <div class="flex flex-col items-center justify-center space-y-6">
            <div class="relative">
                <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center"><i data-lucide="zap" class="w-6 h-6 text-primary"></i></div>
            </div>
            <p class="text-xs font-bold text-primary animate-pulse uppercase tracking-[0.2em]">Real-time Satellite Link Established</p>
        </div>
    `;
    lucide.createIcons();

    try {
        const prompt = `Write a viral social media post for ${platform} about: "${topic}". The tone should be ${tone}. Include relevant hashtags. Use catchy hooks. Respond with ONLY the post content.`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(`Gemini API: ${data.error.message}`);
        }

        if (!data.candidates || data.candidates.length === 0) {
            console.error("Gemini Response Error:", data);
            throw new Error("No content generated. Check your API key permissions.");
        }

        const result = data.candidates[0].content.parts[0].text;

        output.innerHTML = `
            <div class="space-y-6 animate-in zoom-in-95 duration-500">
                <div class="p-8 bg-dark rounded-[2rem] border border-white/5 shadow-inner max-h-80 overflow-y-auto custom-scrollbar">
                    <p class="text-lg text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">${result}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                    <button onclick="saveToSchedule(\`${result.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`, '${platform}')" class="btn-premium flex-1 py-4 text-sm uppercase tracking-widest">Deploy to Queue</button>
                    <button onclick="navigateApp('generator')" class="px-6 py-4 glass border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all"><i data-lucide="refresh-cw"></i></button>
                </div>
            </div>
        `;
    } catch (err) {
        let msg = err.message;
        if (msg.includes("429") || msg.includes("quota")) {
            msg = "⚠️ AI Rate Limit Reached! Google Free Tier allows few requests per minute. Please wait 30-60 seconds and try again.";
        }
        output.innerHTML = `<div class="p-6 glass border border-red-500/20 text-red-400 text-sm text-center rounded-2xl">${msg}</div>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="wand-2" class="w-5 h-5 mr-3"></i> Generate Content`;
        lucide.createIcons();
    }
}

async function saveToSchedule(content, platform) {
    const time = new Date();
    time.setHours(time.getHours() + 24); 

    const { data, error } = await supabaseClient
        .from('schedules')
        .insert([{ 
            content, 
            platform, 
            status: 'pending', 
            timestamp: time.toISOString(),
            user_id: state.user.id 
        }])
        .select();

    if (error) {
        alert("Scheduling Error: " + error.message);
    } else {
        state.schedules.unshift(data[0]);
        navigateApp('scheduler');
    }
}

// 8. PROPULSION (SCHEDULER)
function renderScheduler() {
    const list = document.getElementById('schedule-list');
    if (!list) return;

    if (state.schedules.length === 0) {
        list.innerHTML = `
            <div class="p-20 text-center flex flex-col items-center justify-center opacity-50">
                <i data-lucide="inbox" class="w-16 h-16 mb-4"></i>
                <p class="font-bold uppercase tracking-widest text-xs">Propulsion Queue Empty</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    list.innerHTML = state.schedules.map(post => {
        const date = new Date(post.timestamp);
        return `
            <div class="p-8 flex flex-col xl:flex-row gap-8 items-start hover:bg-white/5 transition-all group">
                <div class="w-48 shrink-0">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Launch</p>
                    <p class="text-xl font-display font-bold text-white">${date.toLocaleDateString(undefined, {month:'short', day:'numeric'})}</p>
                    <p class="text-sm font-medium text-slate-400 mb-4">${date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                    <span class="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        ${post.status}
                    </span>
                </div>
                
                <div class="flex-1 glass p-6 border border-white/5 rounded-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-3 bg-white/5 rounded-bl-2xl">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${post.platform}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed pr-10">${post.content}</p>
                </div>

                <div class="flex gap-2 self-center opacity-0 group-hover:opacity-100 transition-all">
                    <button onclick="deletePost(${post.id})" class="p-2 text-slate-500 hover:text-red-400"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

async function deletePost(id) {
    const { error } = await supabaseClient
        .from('schedules')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Delete Failed: " + error.message);
    } else {
        state.schedules = state.schedules.filter(p => p.id !== id);
        renderScheduler();
    }
}

// 9. INTELLIGENCE (ANALYTICS)
function renderAnalytics() {
    const dashCanvas = document.getElementById('analyticsChart');
    const fullCanvas = document.getElementById('analyticsChartFull');
    
    if (dashCanvas) renderChart(dashCanvas, [12, 19, 15, 25, 32, 45, 38]);
    if (fullCanvas) renderChart(fullCanvas, [40, 45, 38, 52, 60, 58, 70], true);
}

function renderChart(canvas, dataPoints, isFull = false) {
    const chartExist = Chart.getChart(canvas);
    if (chartExist) chartExist.destroy();

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, isFull ? 500 : 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [{
                label: 'Flow Rate',
                data: dataPoints,
                borderColor: '#6366f1',
                borderWidth: isFull ? 5 : 3,
                pointBackgroundColor: '#6366f1',
                pointRadius: isFull ? 4 : 0,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#475569' } },
                x: { grid: { display: false }, border: { display: false }, ticks: { color: '#475569' } }
            }
        }
    });
}
