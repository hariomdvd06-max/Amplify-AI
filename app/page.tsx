import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { CampaignList } from "@/components/dashboard/campaign-list"
import { PlatformStats } from "@/components/dashboard/platform-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScheduledPosts } from "@/components/dashboard/scheduled-posts"
import { AIInsights } from "@/components/dashboard/ai-insights"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Dashboard" 
          description="Welcome back! Here's your marketing overview." 
        />
        <div className="p-6 space-y-6">
          <KPICards />
          
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <PlatformStats />
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <CampaignList />
            <AIInsights />
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <ScheduledPosts />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
