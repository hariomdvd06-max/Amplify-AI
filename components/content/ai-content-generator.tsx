"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { contentSuggestions } from "@/lib/mock-data"
import {
  Sparkles,
  Wand2,
  Image,
  Video,
  LayoutGrid,
  Smartphone,
  Film,
  RefreshCw,
  Copy,
  Calendar,
  TrendingUp,
  Hash,
  Clock,
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const contentTypes = [
  { id: "post", name: "Post", icon: LayoutGrid },
  { id: "story", name: "Story", icon: Smartphone },
  { id: "reel", name: "Reel", icon: Film },
  { id: "carousel", name: "Carousel", icon: Image },
  { id: "video", name: "Video", icon: Video },
]

const tones = [
  { id: "professional", name: "Professional" },
  { id: "casual", name: "Casual" },
  { id: "humorous", name: "Humorous" },
  { id: "inspiring", name: "Inspiring" },
  { id: "educational", name: "Educational" },
]

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
}

export function AIContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedType, setSelectedType] = useState("post")
  const [generatedContent, setGeneratedContent] = useState<string[]>([])

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent([
        "Transform your workflow with our innovative solution. Join thousands of professionals who have already made the switch. Link in bio!",
        "Big news coming your way! We have been working on something special and cannot wait to share it with you. Stay tuned for the reveal.",
        "Success story: How our client increased productivity by 40% in just 30 days. Discover their journey and get inspired to achieve your goals.",
      ])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Selection */}
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {contentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors",
                          selectedType === type.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        <type.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic/Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Prompt</Label>
                  <Textarea
                    id="topic"
                    placeholder="Describe what you want to create content about..."
                    className="min-h-[100px] bg-secondary"
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.id} value={tone.id}>
                          {tone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Platform */}
                <div className="space-y-2">
                  <Label>Target Platform</Label>
                  <Select defaultValue="instagram">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (optional)</Label>
                  <Input
                    id="keywords"
                    placeholder="Add relevant keywords separated by commas"
                    className="bg-secondary"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Zap className="h-5 w-5 text-primary" />
                  Generated Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedContent.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <Sparkles className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-medium text-foreground">
                      No content generated yet
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill in the form and click generate to create AI-powered content
                    </p>
                  </div>
                ) : (
                  generatedContent.map((content, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-secondary/30 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-foreground">{content}</p>
                        <div className="flex shrink-0 gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          {(7 + index * 0.5).toFixed(1)}% predicted engagement
                        </Badge>
                        <Badge variant="secondary">
                          {content.length} characters
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {contentSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <Badge
                      variant="outline"
                      className="capitalize bg-primary/10 text-primary border-primary/20"
                    >
                      {suggestion.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-primary">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {suggestion.predictedEngagement}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{suggestion.content}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {suggestion.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Hash className="mr-0.5 h-3 w-3" />
                        {tag.replace("#", "")}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Best time: {suggestion.bestTime}
                    </div>
                    <div className="flex gap-1">
                      {suggestion.platforms.map((platform) => {
                        const Icon = platformIcons[platform]
                        return Icon ? (
                          <div
                            key={platform}
                            className="flex h-6 w-6 items-center justify-center rounded bg-secondary"
                          >
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Use This Suggestion
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Product Launch", category: "Promotional", uses: 1250 },
              { name: "Behind the Scenes", category: "Engagement", uses: 890 },
              { name: "Customer Testimonial", category: "Social Proof", uses: 2100 },
              { name: "Educational Tips", category: "Value", uses: 1560 },
              { name: "Holiday Campaign", category: "Seasonal", uses: 780 },
              { name: "Contest Announcement", category: "Engagement", uses: 920 },
            ].map((template) => (
              <Card key={template.name} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex h-24 items-center justify-center rounded-lg bg-secondary/50 mb-3">
                    <LayoutGrid className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground">{template.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="secondary">{template.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {template.uses.toLocaleString()} uses
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
