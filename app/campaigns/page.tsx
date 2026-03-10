import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CampaignManager } from "@/components/campaigns/campaign-manager"

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="Campaigns" 
          description="Manage and optimize your marketing campaigns" 
        />
        <div className="p-6">
          <CampaignManager />
        </div>
      </main>
    </div>
  )
}
