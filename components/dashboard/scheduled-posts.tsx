"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { scheduledPosts } from "@/lib/mock-data"
import { Clock, Sparkles, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react"

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

export function ScheduledPosts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Upcoming Posts
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          View Schedule <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {scheduledPosts.slice(0, 4).map((post) => (
          <div
            key={post.id}
            className="rounded-lg border border-border bg-secondary/30 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="line-clamp-2 text-sm text-foreground">
                  {post.content}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {post.platforms.map((platform) => {
                    const Icon = platformIcons[platform]
                    return (
                      <div
                        key={platform}
                        className="flex h-6 w-6 items-center justify-center rounded bg-secondary"
                      >
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )
                  })}
                  {post.aiOptimized && (
                    <Badge variant="outline" className="gap-1 border-primary/20 bg-primary/10 text-primary">
                      <Sparkles className="h-3 w-3" />
                      AI Optimized
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs" suppressHydrationWarning>
                    {mounted ? formatTime(post.scheduledTime) : "--:--"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                  {mounted ? formatDate(post.scheduledTime) : "---"}
                </p>
                <div className="mt-1 flex items-center gap-1 text-primary">
                  <span className="text-xs font-medium">{post.predictedEngagement}%</span>
                  <span className="text-[10px] text-muted-foreground">engagement</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
