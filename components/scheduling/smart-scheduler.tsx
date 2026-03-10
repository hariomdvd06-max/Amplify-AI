"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { scheduledPosts } from "@/lib/mock-data"
import {
  Plus,
  Calendar,
  Clock,
  Sparkles,
  MoreVertical,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Zap,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const hours = Array.from({ length: 24 }, (_, i) => i)

const engagementHeatmap: Record<number, Record<number, number>> = {
  0: { 8: 3, 9: 4, 10: 5, 11: 4, 12: 5, 17: 6, 18: 8, 19: 9, 20: 8, 21: 6 },
  1: { 7: 4, 8: 5, 9: 6, 10: 5, 12: 5, 17: 7, 18: 9, 19: 10, 20: 9, 21: 7 },
  2: { 7: 4, 8: 5, 9: 6, 10: 5, 12: 5, 17: 7, 18: 9, 19: 10, 20: 9, 21: 7 },
  3: { 7: 4, 8: 5, 9: 6, 10: 5, 12: 5, 17: 8, 18: 10, 19: 10, 20: 9, 21: 7 },
  4: { 7: 4, 8: 5, 9: 6, 10: 5, 12: 6, 17: 8, 18: 9, 19: 10, 20: 9, 21: 7 },
  5: { 8: 5, 9: 6, 10: 7, 11: 6, 12: 6, 14: 5, 15: 6, 16: 7, 17: 7, 18: 6 },
  6: { 9: 5, 10: 7, 11: 8, 12: 7, 13: 6, 14: 5, 15: 6, 16: 7, 17: 8, 18: 7 },
}

function getEngagementLevel(dayIndex: number, hour: number): number {
  return engagementHeatmap[dayIndex]?.[hour] || 0
}

function getEngagementColor(level: number): string {
  if (level === 0) return "bg-secondary"
  if (level <= 3) return "bg-primary/20"
  if (level <= 5) return "bg-primary/40"
  if (level <= 7) return "bg-primary/60"
  if (level <= 9) return "bg-primary/80"
  return "bg-primary"
}

export function SmartScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 10))
  const [view, setView] = useState<"week" | "month" | "heatmap">("week")

  const getWeekDates = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      return date
    })
  }

  const weekDates = getWeekDates()

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() - 7)
              setCurrentDate(newDate)
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() + 7)
              setCurrentDate(newDate)
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList className="bg-secondary">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          {view === "week" && (
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {/* Week Header */}
                <div className="grid grid-cols-7 border-b border-border">
                  {weekDates.map((date, index) => {
                    const isToday = date.toDateString() === new Date().toDateString()
                    return (
                      <div
                        key={index}
                        className={cn(
                          "border-r border-border p-3 text-center last:border-r-0",
                          isToday && "bg-primary/5"
                        )}
                      >
                        <p className="text-xs text-muted-foreground">
                          {weekDays[date.getDay()]}
                        </p>
                        <p
                          className={cn(
                            "mt-1 text-lg font-semibold",
                            isToday ? "text-primary" : "text-foreground"
                          )}
                        >
                          {date.getDate()}
                        </p>
                      </div>
                    )
                  })}
                </div>
                {/* Week Content */}
                <div className="grid grid-cols-7 min-h-[400px]">
                  {weekDates.map((date, dayIndex) => {
                    const dayPosts = scheduledPosts.filter((post) => {
                      const postDate = new Date(post.scheduledTime)
                      return postDate.toDateString() === date.toDateString()
                    })
                    return (
                      <div
                        key={dayIndex}
                        className="border-r border-border p-2 last:border-r-0 space-y-2"
                      >
                        {dayPosts.map((post) => {
                          const postTime = new Date(post.scheduledTime)
                          return (
                            <div
                              key={post.id}
                              className="rounded-lg border border-border bg-secondary/50 p-2 text-xs hover:border-primary/50 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-foreground">
                                  {postTime.toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {post.aiOptimized && (
                                  <Sparkles className="h-3 w-3 text-primary" />
                                )}
                              </div>
                              <p className="mt-1 line-clamp-2 text-muted-foreground">
                                {post.content.slice(0, 50)}...
                              </p>
                              <div className="mt-2 flex gap-1">
                                {post.platforms.map((platform) => {
                                  const Icon = platformIcons[platform]
                                  return (
                                    <div
                                      key={platform}
                                      className="flex h-5 w-5 items-center justify-center rounded bg-secondary"
                                    >
                                      <Icon className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {view === "heatmap" && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Engagement Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  AI-analyzed optimal posting times based on your audience engagement patterns
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-1 text-xs text-muted-foreground"></th>
                        {hours.slice(6, 23).map((hour) => (
                          <th key={hour} className="p-1 text-xs text-muted-foreground">
                            {hour}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weekDays.map((day, dayIndex) => (
                        <tr key={day}>
                          <td className="p-1 text-xs text-muted-foreground font-medium">
                            {day}
                          </td>
                          {hours.slice(6, 23).map((hour) => {
                            const level = getEngagementLevel(dayIndex, hour)
                            return (
                              <td key={hour} className="p-0.5">
                                <div
                                  className={cn(
                                    "h-6 w-6 rounded-sm",
                                    getEngagementColor(level)
                                  )}
                                  title={`${day} ${hour}:00 - Engagement: ${level}/10`}
                                />
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Low</span>
                  <div className="flex gap-1">
                    <div className="h-4 w-4 rounded-sm bg-secondary" />
                    <div className="h-4 w-4 rounded-sm bg-primary/20" />
                    <div className="h-4 w-4 rounded-sm bg-primary/40" />
                    <div className="h-4 w-4 rounded-sm bg-primary/60" />
                    <div className="h-4 w-4 rounded-sm bg-primary/80" />
                    <div className="h-4 w-4 rounded-sm bg-primary" />
                  </div>
                  <span>High</span>
                </div>
              </CardContent>
            </Card>
          )}

          {view === "month" && (
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                    <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - currentDate.getDay() + 1)
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                    const isToday = date.toDateString() === new Date().toDateString()
                    return (
                      <div
                        key={i}
                        className={cn(
                          "min-h-[80px] rounded-lg border border-border p-2",
                          !isCurrentMonth && "opacity-40",
                          isToday && "border-primary bg-primary/5"
                        )}
                      >
                        <span className={cn("text-sm", isToday ? "text-primary font-semibold" : "text-foreground")}>
                          {date.getDate()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Zap className="h-5 w-5 text-primary" />
                AI Optimal Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { day: "Today", time: "6:00 PM", engagement: "High", platform: "instagram" },
                { day: "Tomorrow", time: "10:00 AM", engagement: "Very High", platform: "linkedin" },
                { day: "Wed, Mar 12", time: "7:30 PM", engagement: "High", platform: "tiktok" },
              ].map((slot, index) => {
                const Icon = platformIcons[slot.platform]
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{slot.day}</p>
                        <p className="text-sm text-muted-foreground">{slot.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {slot.engagement}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduledPosts.slice(0, 3).map((post) => {
                const postDate = new Date(post.scheduledTime)
                return (
                  <div
                    key={post.id}
                    className="rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {postDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at{" "}
                          {postDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Post
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.content}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
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
                        <Badge variant="outline" className="gap-1 text-xs bg-primary/10 text-primary border-primary/20">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
