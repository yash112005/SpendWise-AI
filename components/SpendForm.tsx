// components/SpendForm.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Users,
  Brain,
  DollarSign,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { FormData, ToolInput, ToolName, UseCase } from "@/types"

// ============================================
// TOOL CONFIG
// ============================================

const TOOL_PLANS: Record<ToolName, string[]> = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  github_copilot: ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
  chatgpt: ["Plus", "Team", "Enterprise", "API"],
  anthropic_api: ["Pay as you go"],
  openai_api: ["Pay as you go"],
  gemini: ["Free", "Pro", "Ultra", "API"],
  windsurf: ["Free", "Pro", "Teams"],
}

const TOOL_LABELS: Record<ToolName, string> = {
  cursor: "Cursor",
  github_copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  anthropic_api: "Anthropic API",
  openai_api: "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf",
}

const TOOL_GRADIENTS: Record<ToolName, string> = {
  cursor: "from-violet-500 to-fuchsia-500",
  github_copilot: "from-gray-700 to-gray-900",
  claude: "from-orange-500 to-amber-500",
  chatgpt: "from-emerald-500 to-green-600",
  anthropic_api: "from-orange-400 to-red-500",
  openai_api: "from-cyan-500 to-blue-500",
  gemini: "from-blue-500 to-indigo-500",
  windsurf: "from-pink-500 to-rose-500",
}

const ALL_TOOLS = Object.keys(TOOL_PLANS) as ToolName[]

const DEFAULT_FORM: FormData = {
  tools: [],
  teamSize: 1,
  useCase: "mixed",
}

export default function SpendForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM)
  const [loading, setLoading] = useState(false)

  // ============================================
  // LOCAL STORAGE
  // ============================================

  useEffect(() => {
    const saved = localStorage.getItem("credex_form")

    if (saved) {
      setFormData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("credex_form", JSON.stringify(formData))
  }, [formData])

  // ============================================
  // TOOL ACTIONS
  // ============================================

  const addTool = (toolName: ToolName) => {
    if (formData.tools.find((t) => t.tool === toolName)) return

    const newTool: ToolInput = {
      tool: toolName,
      plan: TOOL_PLANS[toolName][0],
      monthlySpend: 0,
      seats: 1,
    }

    setFormData((prev) => ({
      ...prev,
      tools: [...prev.tools, newTool],
    }))
  }

  const removeTool = (toolName: ToolName) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.tool !== toolName),
    }))
  }

  const updateTool = (
    toolName: ToolName,
    field: keyof ToolInput,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) =>
        t.tool === toolName ? { ...t, [field]: value } : t
      ),
    }))
  }

  // ============================================
  // TOTAL SPEND
  // ============================================

  const totalSpend = formData.tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  )

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async () => {
    if (formData.tools.length === 0) {
      alert("Kam se kam ek tool add karo!")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      router.push(`/audit/${data.id}`)
    } catch (error) {
      console.error(error)
      alert("Kuch error aaya, dobara try karo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 md:pt-10">

        {/* HERO */}
        <div className="mb-12 text-center md:mb-16">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl shadow-lg">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />

            <span className="text-sm tracking-wide text-gray-300">
              Free AI Cost Optimization Audit
            </span>
          </div>

          <h1 className="mb-5 bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 bg-clip-text text-5xl font-black leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl">
            SpendWise AI
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
            Discover where your startup is overspending on AI tools —
            Cursor, Claude, ChatGPT, APIs and more.
          </p>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <div className="min-w-[150px] rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              <div className="text-3xl font-black text-white">
                ${totalSpend}
              </div>

              <div className="mt-1 text-sm text-gray-400">
                Monthly Spend
              </div>
            </div>

            <div className="min-w-[150px] rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              <div className="text-3xl font-black text-white">
                {formData.tools.length}
              </div>

              <div className="mt-1 text-sm text-gray-400">
                Active Tools
              </div>
            </div>

            <div className="min-w-[150px] rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              <div className="text-3xl font-black text-white">
                {formData.teamSize}
              </div>

              <div className="mt-1 text-sm text-gray-400">
                Team Members
              </div>
            </div>

          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* TEAM INFO */}
            <Card className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-2xl">
              <CardContent className="p-6 sm:p-8">

                <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Team Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Configure your startup details
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  {/* TEAM SIZE */}
                  <div className="space-y-3">

                    <Label className="text-sm font-medium text-gray-300">
                      Team Size
                    </Label>

                    <div className="relative">

                      <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                      <Input
                        type="number"
                        min={1}
                        value={formData.teamSize}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            teamSize: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="h-14 rounded-2xl border border-white/10 bg-black/30 pl-12 pr-4 text-[15px] font-medium text-white placeholder:text-gray-500 transition-all duration-200 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* USE CASE */}
                  <div className="space-y-3">

                    <Label className="text-sm font-medium text-gray-300">
                      Primary Use Case
                    </Label>

                    <Select
                      value={formData.useCase}
                      onValueChange={(v) =>
                        setFormData((prev) => ({
                          ...prev,
                          useCase: v as UseCase,
                        }))
                      }
                    >
                      <SelectTrigger className="h-14 rounded-2xl border border-white/10 bg-black/30 px-4 text-[15px] font-medium text-white transition-all duration-200 focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/20 focus-visible:ring-0">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="rounded-2xl border border-white/10 bg-[#0F0F10] text-white">
                        <SelectItem value="coding">Coding</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="data">Data Analysis</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>

                  </div>

                </div>
              </CardContent>
            </Card>

            {/* TOOL SELECTOR */}
            <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">
              <CardContent className="p-8">

                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600">
                    <Brain className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      AI Stack
                    </h2>

                    <p className="text-sm text-gray-400">
                      Add all tools your team uses
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                  {ALL_TOOLS.map((tool) => {
                    const isAdded = formData.tools.find(
                      (t) => t.tool === tool
                    )

                    return (
                      <button
                        key={tool}
                        onClick={() =>
                          isAdded
                            ? removeTool(tool)
                            : addTool(tool)
                        }
                        className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
                          isAdded
                            ? "scale-[1.02] border-transparent bg-white/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/10"
                        }`}
                      >

                        <div
                          className={`absolute inset-0 opacity-20 bg-gradient-to-br ${TOOL_GRADIENTS[tool]}`}
                        />

                        <div className="relative z-10">

                          <div className="mb-6 flex items-center justify-between">

                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${TOOL_GRADIENTS[tool]} font-bold text-white`}
                            >
                              {TOOL_LABELS[tool][0]}
                            </div>

                            {isAdded ? (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                ✓
                              </div>
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
                                <Plus className="h-4 w-4 text-gray-300" />
                              </div>
                            )}

                          </div>

                          <h3 className="text-lg font-semibold text-white">
                            {TOOL_LABELS[tool]}
                          </h3>

                          <p className="mt-1 text-sm text-gray-400">
                            {TOOL_PLANS[tool].length} plans available
                          </p>

                        </div>
                      </button>
                    )
                  })}

                </div>
              </CardContent>
            </Card>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* SAVINGS */}
            <Card className="sticky top-6 overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-fuchsia-600 to-cyan-600">

              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

              <CardContent className="relative z-10 p-8">

                <div className="mb-6 flex items-center gap-3">
                  <Zap className="h-7 w-7 text-yellow-300" />

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Estimated Waste
                    </h3>

                    <p className="text-sm text-white/70">
                      Based on startup patterns
                    </p>
                  </div>
                </div>

                <div className="mb-2 text-6xl font-black text-white">
                  ${Math.round(totalSpend * 0.25)}
                </div>

                <p className="text-white/80">
                  Potential monthly savings
                </p>

              </CardContent>
            </Card>

            {/* TRUST */}
            <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">
              <CardContent className="p-6">

                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-green-400" />

                  <h3 className="text-lg font-bold text-white">
                    Why Use This?
                  </h3>
                </div>

                <div className="space-y-4 text-sm">

                  <div className="flex gap-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />

                    <p className="text-gray-300">
                      Detect duplicate AI subscriptions
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-fuchsia-400" />

                    <p className="text-gray-300">
                      Optimize team vs individual plans
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-green-400" />

                    <p className="text-gray-300">
                      Find hidden API overspending
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* TOOL CONFIGURATION */}
        {formData.tools.length > 0 && (
          <div className="mt-8 space-y-6">

            {formData.tools.map((toolInput) => (
              <Card
                key={toolInput.tool}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl"
              >

                <div
                  className={`h-1 bg-gradient-to-r ${TOOL_GRADIENTS[toolInput.tool]}`}
                />

                <CardContent className="p-8">

                  <div className="mb-8 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${TOOL_GRADIENTS[toolInput.tool]} text-lg font-bold text-white`}
                      >
                        {TOOL_LABELS[toolInput.tool][0]}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {TOOL_LABELS[toolInput.tool]}
                        </h3>

                        <p className="text-sm text-gray-400">
                          Configure current spend
                        </p>
                      </div>

                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTool(toolInput.tool)}
                      className="rounded-2xl hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>

                  </div>

                  <div className="grid gap-6 md:grid-cols-3">

                    {/* PLAN */}
                    <div className="space-y-2">

                      <Label className="text-gray-300">
                        Current Plan
                      </Label>

                      <Select
                        value={toolInput.plan}
                        onValueChange={(v) =>
                          updateTool(toolInput.tool, "plan", v)
                        }
                      >
                        <SelectTrigger className="h-14 rounded-2xl border-white/10 bg-black/30 text-white">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {TOOL_PLANS[toolInput.tool].map((plan) => (
                            <SelectItem key={plan} value={plan}>
                              {plan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* SPEND */}
                    <div className="space-y-2">

                      <Label className="text-gray-300">
                        Monthly Spend ($)
                      </Label>

                      <div className="relative">

                        <DollarSign className="absolute left-4 top-4 h-5 w-5 text-gray-500" />

                        <Input
                          type="number"
                          min={0}
                          value={toolInput.monthlySpend}
                          onChange={(e) =>
                            updateTool(
                              toolInput.tool,
                              "monthlySpend",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-14 rounded-2xl border-white/10 bg-black/30 pl-11 text-white"
                        />
                      </div>
                    </div>

                    {/* SEATS */}
                    <div className="space-y-2">

                      <Label className="text-gray-300">
                        Seats
                      </Label>

                      <Input
                        type="number"
                        min={1}
                        value={toolInput.seats}
                        onChange={(e) =>
                          updateTool(
                            toolInput.tool,
                            "seats",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="h-14 rounded-2xl border-white/10 bg-black/30 text-white"
                      />
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))}

            {/* SUBMIT */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="h-16 w-full rounded-3xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 text-lg font-bold transition-all duration-300 hover:opacity-90"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Generating Audit...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  Generate Free Audit
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>

          </div>
        )}

      </div>
    </div>
  )
}