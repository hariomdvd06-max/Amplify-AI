"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateCampaignModalProps {
  onClose: () => void
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "twitter", name: "Twitter", icon: Twitter },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
  {
    id: "tiktok",
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
]

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Platforms" },
  { id: 3, name: "Audience" },
  { id: 4, name: "Budget" },
]

export function CreateCampaignModal({ onClose }: CreateCampaignModalProps) {
  const [step, setStep] = useState(1)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [budget, setBudget] = useState([5000])
  const [ageRange, setAgeRange] = useState([18, 45])

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Set up your campaign in a few simple steps
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {s.id}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm",
                  step >= s.id ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.name}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-4 h-px w-8 bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Summer Product Launch"
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="traffic">Website Traffic</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals and strategy..."
                  className="min-h-[100px] bg-secondary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input id="start" type="date" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input id="end" type="date" className="bg-secondary" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select the platforms where your campaign will run
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id)
                  return (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary hover:border-primary/50"
                      )}
                    >
                      <platform.icon
                        className={cn(
                          "h-6 w-6",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-primary" : "text-foreground"
                        )}
                      >
                        {platform.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">AI Recommendation</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on your target audience, we recommend focusing on Instagram and TikTok
                  for maximum engagement with 18-35 year olds.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Age Range</Label>
                <div className="px-2">
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    min={13}
                    max={65}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{ageRange[0]} years</span>
                    <span>{ageRange[1]} years</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Locations</Label>
                <Input
                  placeholder="Add locations (e.g., United States, Canada)"
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label>Interests</Label>
                <Input
                  placeholder="Add interests (e.g., Technology, Fashion)"
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-3">
                <Label>Demographics</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Professionals", "Students", "Parents", "Small Business Owners", "Early Adopters", "Decision Makers"].map((demo) => (
                    <label
                      key={demo}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3"
                    >
                      <Checkbox id={demo} />
                      <span className="text-sm text-foreground">{demo}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Total Budget</Label>
                <div className="px-2">
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    min={500}
                    max={50000}
                    step={500}
                    className="py-4"
                  />
                  <div className="text-center">
                    <span className="text-3xl font-bold text-foreground">
                      ${budget[0].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Budget Distribution</Label>
                <Select>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Select distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="even">Even Distribution</SelectItem>
                    <SelectItem value="performance">Performance Based</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-4">
                <h4 className="font-medium text-foreground">Budget Breakdown</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Ad Spend</span>
                    <span className="text-foreground">${(budget[0] * 0.7).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Content Creation</span>
                    <span className="text-foreground">${(budget[0] * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Optimization</span>
                    <span className="text-foreground">${(budget[0] * 0.1).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  Enable AI optimization to automatically adjust budget allocation based on performance.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {step > 1 ? "Previous" : "Cancel"}
          </Button>
          <Button onClick={() => (step < 4 ? setStep(step + 1) : onClose())}>
            {step < 4 ? "Next" : "Create Campaign"}
            {step < 4 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
