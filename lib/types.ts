export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'draft' | 'completed'
  platforms: Platform[]
  budget: number
  spent: number
  startDate: string
  endDate: string
  targetAudience: TargetAudience
  performance: CampaignPerformance
}

export interface Platform {
  name: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube'
  enabled: boolean
  followers: number
  posts: number
}

export interface TargetAudience {
  ageRange: [number, number]
  locations: string[]
  interests: string[]
  demographics: string[]
}

export interface CampaignPerformance {
  impressions: number
  reach: number
  engagement: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roi: number
}

export interface ScheduledPost {
  id: string
  campaignId: string
  content: string
  mediaUrl?: string
  platforms: string[]
  scheduledTime: string
  status: 'scheduled' | 'published' | 'failed'
  aiOptimized: boolean
  predictedEngagement: number
}

export interface AnalyticsData {
  date: string
  impressions: number
  reach: number
  engagement: number
  clicks: number
  conversions: number
}

export interface AudienceInsight {
  category: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
}

export interface ContentSuggestion {
  id: string
  type: 'image' | 'video' | 'carousel' | 'story' | 'reel'
  content: string
  hashtags: string[]
  predictedEngagement: number
  bestTime: string
  platforms: string[]
}
