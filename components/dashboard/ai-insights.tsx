"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Lightbulb, TrendingUp, Clock, Target, ArrowRight } from "lucide-react"

const insights = [
  {
    icon: TrendingUp,
    title: "Peak Engagement Detected",
    description: "Your audience is 45% more active between 6-8 PM EST. Consider scheduling more content during this window.",
    action: "Optimize Schedule",
    priority: "high",
  },
  {
    icon: Target,
    title: "Audience Expansion Opportunity",
    description: "Similar demographics in Canada show high conversion potential. Expand targeting to capture this audience.",
    action: "Review Targeting",
    priority: "medium",
  },
  {
    icon: Clock,
    title: "Content Frequency Suggestion",
    description: "Increasing Instagram Reels from 3 to 5 per week could boost engagement by an estimated 28%.",
    action: "Adjust Strategy",
    priority: "medium",
  },
  {
    icon: Lightbulb,
    title: "Trending Topic Alert",
    description: "Industry-related keywords are trending. Create timely content to capitalize on increased search volume.",
    action: "Generate Content",
    priority: "high",
  },
]

const priorityStyles: Record<string, string> = {
  high: "border-l-primary",
  medium: "border-l-warning",
  low: "border-l-info",
}

export function AIInsights() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            AI Recommendations
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg border border-border border-l-4 bg-secondary/30 p-4",
              priorityStyles[insight.priority]
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <insight.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{insight.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {insight.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-7 gap-1 px-2 text-primary hover:text-primary"
                >
                  {insight.action}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
