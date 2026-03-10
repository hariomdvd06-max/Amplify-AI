import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ReportingCenter } from "@/components/reports/reporting-center"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Reports" 
          description="Generate and export performance reports" 
        />
        <div className="p-6">
          <ReportingCenter />
        </div>
      </main>
    </div>
  )
}
