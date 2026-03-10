"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  Palette,
  Zap,
  Globe,
  Key,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Check,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const connectedPlatforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, connected: true, account: "@company_official" },
  { id: "facebook", name: "Facebook", icon: Facebook, connected: true, account: "Company Page" },
  { id: "twitter", name: "Twitter", icon: Twitter, connected: true, account: "@company" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, connected: true, account: "Company Inc." },
  { id: "youtube", name: "YouTube", icon: Youtube, connected: false, account: null },
  {
    id: "tiktok",
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    connected: false,
    account: null,
  },
]

export function SettingsPanel() {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="bg-secondary">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="platforms">Platforms</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="ai">AI Settings</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="Company Inc." className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="team@company.com" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how the platform looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Use dark theme across the platform
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Compact View</p>
                <p className="text-sm text-muted-foreground">
                  Show more content with reduced spacing
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="platforms" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Globe className="h-5 w-5 text-primary" />
              Connected Platforms
            </CardTitle>
            <CardDescription>
              Manage your social media platform connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectedPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <platform.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{platform.name}</p>
                    {platform.connected ? (
                      <p className="text-sm text-muted-foreground">{platform.account}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    )}
                  </div>
                </div>
                {platform.connected ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-primary">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ) : (
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how and when you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Campaign Notifications</h4>
              {[
                { id: "campaign-complete", label: "Campaign completed", description: "Get notified when a campaign ends" },
                { id: "budget-alert", label: "Budget alerts", description: "Alert when budget reaches 80%" },
                { id: "performance-spike", label: "Performance spikes", description: "Unusual engagement detected" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h4 className="font-medium text-foreground">Content Notifications</h4>
              {[
                { id: "post-published", label: "Post published", description: "Confirmation when posts go live" },
                { id: "post-failed", label: "Post failed", description: "Alert when a scheduled post fails" },
                { id: "ai-suggestions", label: "AI suggestions", description: "New content recommendations" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Zap className="h-5 w-5 text-primary" />
              AI Configuration
            </CardTitle>
            <CardDescription>
              Customize AI behavior and automation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Content Generation</h4>
              {[
                { id: "auto-hashtags", label: "Auto-generate hashtags", description: "AI suggests relevant hashtags" },
                { id: "tone-matching", label: "Brand tone matching", description: "Match content to your brand voice" },
                { id: "multi-language", label: "Multi-language support", description: "Generate content in multiple languages" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h4 className="font-medium text-foreground">Scheduling Optimization</h4>
              {[
                { id: "smart-timing", label: "Smart timing", description: "AI optimizes posting times" },
                { id: "auto-reschedule", label: "Auto-reschedule", description: "Automatically adjust failing posts" },
                { id: "audience-analysis", label: "Audience analysis", description: "Continuous audience learning" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">AI Learning Mode</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                The AI continuously learns from your campaign performance to improve suggestions
                and optimizations over time.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security and access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">Session Management</p>
                  <p className="text-sm text-muted-foreground">
                    View and manage active sessions
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h4 className="font-medium text-foreground">API Access</h4>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">API Key</p>
                      <p className="text-sm text-muted-foreground">
                        sk-****************************1234
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
