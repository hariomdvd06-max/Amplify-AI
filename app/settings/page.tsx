import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { SettingsPanel } from "@/components/settings/settings-panel"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Settings" 
          description="Manage your account and platform preferences" 
        />
        <div className="p-6">
          <SettingsPanel />
        </div>
      </main>
    </div>
  )
}
