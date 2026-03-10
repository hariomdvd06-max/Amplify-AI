import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { AIContentGenerator } from "@/components/content/ai-content-generator"

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <Header 
          title="AI Content Studio" 
          description="Generate and optimize content with AI assistance" 
        />
        <div className="p-6">
          <AIContentGenerator />
        </div>
      </main>
    </div>
  )
}
