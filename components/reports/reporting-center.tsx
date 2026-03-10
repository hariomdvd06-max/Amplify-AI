"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Download,
  Plus,
  Calendar,
  Clock,
  Send,
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Sparkles,
  Settings,
  Play,
  Pause,
  Mail,
  FileSpreadsheet,
  FileImage,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

const reportTemplates = [
  {
    id: "1",
    name: "Campaign Performance Summary",
    description: "Overview of all active campaigns with key metrics and ROI analysis",
    icon: BarChart3,
    frequency: "Weekly",
    lastGenerated: "Mar 8, 2026",
  },
  {
    id: "2",
    name: "Audience Growth Report",
    description: "Detailed analysis of follower growth and audience demographics",
    icon: Users,
    frequency: "Monthly",
    lastGenerated: "Mar 1, 2026",
  },
  {
    id: "3",
    name: "Engagement Analytics",
    description: "Comprehensive breakdown of engagement metrics across platforms",
    icon: TrendingUp,
    frequency: "Weekly",
    lastGenerated: "Mar 7, 2026",
  },
  {
    id: "4",
    name: "Content Performance",
    description: "Analysis of top performing content with recommendations",
    icon: Eye,
    frequency: "Weekly",
    lastGenerated: "Mar 9, 2026",
  },
]

const scheduledReports = [
  {
    id: "1",
    name: "Weekly Performance Summary",
    recipients: ["team@company.com", "manager@company.com"],
    frequency: "Every Monday at 9:00 AM",
    format: "PDF",
    status: "active",
  },
  {
    id: "2",
    name: "Monthly Analytics Report",
    recipients: ["stakeholders@company.com"],
    frequency: "1st of every month",
    format: "PDF + Excel",
    status: "active",
  },
  {
    id: "3",
    name: "Campaign ROI Report",
    recipients: ["finance@company.com"],
    frequency: "Bi-weekly",
    format: "Excel",
    status: "paused",
  },
]

const generatedReports = [
  {
    id: "1",
    name: "Campaign Performance - Week 10",
    type: "Campaign Performance Summary",
    date: "Mar 10, 2026",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "2",
    name: "Q1 Audience Analysis",
    type: "Audience Growth Report",
    date: "Mar 8, 2026",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "3",
    name: "February Engagement Report",
    type: "Engagement Analytics",
    date: "Mar 1, 2026",
    size: "3.2 MB",
    format: "Excel",
  },
  {
    id: "4",
    name: "Content Performance - February",
    type: "Content Performance",
    date: "Mar 1, 2026",
    size: "2.1 MB",
    format: "PDF",
  },
]

const metricsOptions = [
  { id: "impressions", label: "Impressions", checked: true },
  { id: "reach", label: "Reach", checked: true },
  { id: "engagement", label: "Engagement Rate", checked: true },
  { id: "clicks", label: "Clicks", checked: true },
  { id: "ctr", label: "Click-Through Rate", checked: true },
  { id: "conversions", label: "Conversions", checked: false },
  { id: "roi", label: "ROI", checked: true },
  { id: "cpc", label: "Cost Per Click", checked: false },
  { id: "followers", label: "Follower Growth", checked: true },
  { id: "shares", label: "Shares", checked: false },
]

export function ReportingCenter() {
  const [selectedMetrics, setSelectedMetrics] = useState(
    metricsOptions.filter((m) => m.checked).map((m) => m.id)
  )
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId)
        ? prev.filter((id) => id !== metricId)
        : [...prev, metricId]
    )
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <template.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {template.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {template.frequency}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last: {template.lastGenerated}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Report Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Configure Your Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="report-name">Report Name</Label>
                      <Input
                        id="report-name"
                        placeholder="e.g., Q1 Performance Summary"
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select defaultValue="30d">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Platforms to Include</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok", "YouTube"].map(
                        (platform) => (
                          <label
                            key={platform}
                            className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3 cursor-pointer hover:border-primary/50"
                          >
                            <Checkbox defaultChecked />
                            <span className="text-sm text-foreground">{platform}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Metrics to Include</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {metricsOptions.map((metric) => (
                        <label
                          key={metric.id}
                          className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3 cursor-pointer hover:border-primary/50"
                        >
                          <Checkbox
                            checked={selectedMetrics.includes(metric.id)}
                            onCheckedChange={() => toggleMetric(metric.id)}
                          />
                          <span className="text-sm text-foreground">{metric.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              PDF Document
                            </div>
                          </SelectItem>
                          <SelectItem value="excel">
                            <div className="flex items-center gap-2">
                              <FileSpreadsheet className="h-4 w-4" />
                              Excel Spreadsheet
                            </div>
                          </SelectItem>
                          <SelectItem value="png">
                            <div className="flex items-center gap-2">
                              <FileImage className="h-4 w-4" />
                              Image (PNG)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Campaigns</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Campaigns</SelectItem>
                          <SelectItem value="active">Active Only</SelectItem>
                          <SelectItem value="selected">Select Specific</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Schedule This Report
                </Button>
              </div>
            </div>

            {/* Preview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Eye className="h-5 w-5 text-primary" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-medium text-foreground">Report Summary</span>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date Range</span>
                      <span className="text-foreground">Last 30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platforms</span>
                      <span className="text-foreground">6 selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Metrics</span>
                      <span className="text-foreground">{selectedMetrics.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format</span>
                      <span className="text-foreground">PDF</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">AI insights included</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
              <p className="text-sm text-muted-foreground">
                Automate report generation and delivery
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Schedule
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <Card key={report.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{report.name}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              report.status === "active"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {report.status === "active" ? "Active" : "Paused"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {report.recipients.length} recipient(s)
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {report.format}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        {report.status === "active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Report History</h3>
              <p className="text-sm text-muted-foreground">
                Access and download previously generated reports
              </p>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-secondary">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="audience">Audience</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {generatedReports.map((report) => (
              <Card key={report.id} className="bg-card border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      {report.format === "PDF" ? (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{report.name}</h4>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{report.format}</Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
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
