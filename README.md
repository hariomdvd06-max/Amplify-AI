# Amplify AI - Cloud Powered Marketing Engine

A professional Social Media Marketing platform with a **Cloud Backend** and **Real AI Integration**.

## 🚀 How to Run
1. Open `c:\Hackathon`
2. Double-click `index.html`.
3. Link your Supabase database (already configured).
4. Use the **Gemini AI** engine to write real viral content.

## 🛠️ Technology Stack (Professional Grade)
- **Frontend**: Pure HTML5, Tailwind CSS, Chart.js.
- **Backend-as-a-Service**: **Supabase** (PostgreSQL, Auth, Real-time).
- **AI Engine**: **Google Gemini AI** (Generative AI).
- **Infrastructure**: Zero-dependency delivery.

## ⚠️ Database Setup (Action Required)
Since this uses a real database, you must create the tables in your Supabase SQL Editor:
```sql
-- Create Campaigns Table
create table campaigns (
  id uuid default uuid_generate_v4() primary key,
  name text,
  platform text,
  goals text,
  user_id uuid references auth.users
);

-- Create Schedules Table
create table schedules (
  id uuid default uuid_generate_v4() primary key,
  content text,
  platform text,
  status text,
  timestamp timestamptz,
  user_id uuid references auth.users
);
```

## 🔐 Credentials
- **Supabase URL**: `https://czcnnzejcjzdvxydiuoc.supabase.co`
- **AI**: Google Gemini Flash 1.5
