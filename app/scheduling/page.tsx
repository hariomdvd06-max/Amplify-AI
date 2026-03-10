import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { SmartScheduler } from "@/components/scheduling/smart-scheduler"

export default function SchedulingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Smart Scheduling" 
          description="AI-optimized posting schedule for maximum engagement" 
        />
        <div className="p-6">
          <SmartScheduler />
        </div>
      </main>
    </div>
  )
}
