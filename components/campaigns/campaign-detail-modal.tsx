"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Campaign } from "@/lib/types"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Users,
  MapPin,
  Heart,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  MousePointerClick,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface CampaignDetailModalProps {
  campaign: Campaign
  onClose: () => void
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  paused: "bg-warning/10 text-warning border-warning/20",
  draft: "bg-muted text-muted-foreground border-border",
  completed: "bg-secondary text-secondary-foreground border-border",
}

const mockPerformanceData = [
  { day: "Mon", impressions: 125, engagement: 45, clicks: 12 },
  { day: "Tue", impressions: 142, engagement: 52, clicks: 18 },
  { day: "Wed", impressions: 138, engagement: 48, clicks: 15 },
  { day: "Thu", impressions: 165, engagement: 62, clicks: 22 },
  { day: "Fri", impressions: 178, engagement: 71, clicks: 28 },
  { day: "Sat", impressions: 195, engagement: 85, clicks: 35 },
  { day: "Sun", impressions: 210, engagement: 92, clicks: 42 },
]

export function CampaignDetailModal({ campaign, onClose }: CampaignDetailModalProps) {
  const budgetProgress = (campaign.spent / campaign.budget) * 100

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {campaign.name}
            </DialogTitle>
            <Badge
              variant="outline"
              className={cn("capitalize", statusStyles[campaign.status])}
            >
              {campaign.status}
            </Badge>
          </div>
          <DialogDescription>
            View campaign performance, audience insights, and settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Impressions</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {(campaign.performance.impressions / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Engagement</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {(campaign.performance.engagement / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">CTR</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {campaign.performance.ctr}%
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">ROI</span>
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {campaign.performance.roi}%
                </p>
              </div>
            </div>

            {/* Budget */}
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Budget</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                </span>
              </div>
              <Progress value={budgetProgress} className="mt-3 h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {budgetProgress.toFixed(1)}% of budget used
              </p>
            </div>

            {/* Platforms */}
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground">Active Platforms</h4>
              <div className="mt-3 flex flex-wrap gap-3">
                {campaign.platforms.map((platform) => {
                  const Icon = platformIcons[platform.name]
                  return (
                    <div
                      key={platform.name}
                      className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium capitalize text-foreground">
                          {platform.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(platform.followers / 1000).toFixed(0)}K followers
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Campaign Timeline</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(campaign.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-muted-foreground">End Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4 space-y-6">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground">Weekly Performance</h4>
              <div className="mt-4 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPerformanceData}>
                    <defs>
                      <linearGradient id="modalImpressions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="impressions"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      fill="url(#modalImpressions)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {campaign.performance.clicks.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {campaign.performance.conversions.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Cost Per Click</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  ${campaign.performance.cpc}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="mt-4 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Age Range</span>
                </div>
                <p className="mt-2 text-lg text-foreground">
                  {campaign.targetAudience.ageRange[0]} - {campaign.targetAudience.ageRange[1]} years
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Locations</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {campaign.targetAudience.locations.map((location) => (
                    <Badge key={location} variant="secondary">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Interests</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {campaign.targetAudience.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Demographics</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {campaign.targetAudience.demographics.map((demo) => (
                    <Badge key={demo} variant="secondary">
                      {demo}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground">Campaign Settings</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Configure campaign parameters, budget limits, and automation rules.
              </p>
              <Button className="mt-4" variant="outline">
                Edit Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
