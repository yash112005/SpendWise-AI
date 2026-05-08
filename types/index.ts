// types/index.ts

export type ToolName =
  | 'cursor'
  | 'github_copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'windsurf'

export type UseCase =
  | 'coding'
  | 'writing'
  | 'data'
  | 'research'
  | 'mixed'

export type ToolInput = {
  tool: ToolName
  plan: string
  monthlySpend: number
  seats: number
}

export type FormData = {
  tools: ToolInput[]
  teamSize: number
  useCase: UseCase
}

export type AuditResult = {
  tool: ToolName
  currentSpend: number
  recommendedAction: string
  potentialSaving: number
  reason: string
  credexRelevant: boolean
}

export type AuditReport = {
  id?: string
  results: AuditResult[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  aiSummary?: string
  createdAt?: string
}