import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Analytics" 
          description="In-depth insights and performance metrics" 
        />
        <div className="p-6">
          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
}
