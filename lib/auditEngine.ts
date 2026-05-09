// lib/auditEngine.ts

import type { FormData, AuditResult, AuditReport, ToolInput } from '@/types'
import { PRICING } from './pricing'

// ============================================
// RULES — Har rule ek specific check karta hai
// ============================================

type Rule = {
  id: string
  applies: (tool: ToolInput, form: FormData) => boolean
  recommendation: string
  calculateSaving: (tool: ToolInput) => number
  reason: string
  credexRelevant: boolean
}

const AUDIT_RULES: Rule[] = [
  // Rule 1: Team plan with too few seats
  {
    id: 'team_plan_few_seats',
    applies: (tool, form) =>
      tool.plan === 'Team' && form.teamSize <= 3,
    recommendation: 'Individual/Pro plan pe switch karo',
    calculateSaving: (tool) => {
      const teamPrice = PRICING[tool.tool]?.find(p => p.plan === 'Team')?.pricePerSeat || 0
      const individualPrice = PRICING[tool.tool]?.find(
        p => p.plan === 'Pro' || p.plan === 'Individual'
      )?.pricePerSeat || 0
      return Math.max(0, (teamPrice - individualPrice) * tool.seats)
    },
    reason: '3 se kam users ke liye Team plan overkill hai — Pro/Individual sasta padega',
    credexRelevant: false,
  },

  // Rule 2: Paying for both Claude and ChatGPT for coding
  {
    id: 'duplicate_coding_tools',
    applies: (tool, form) => {
      const hasClaude = form.tools.some(t => t.tool === 'claude')
      const hasChatGPT = form.tools.some(t => t.tool === 'chatgpt')
      return (
        (tool.tool === 'chatgpt' || tool.tool === 'claude') &&
        hasClaude &&
        hasChatGPT &&
        form.useCase === 'coding'
      )
    },
    recommendation: 'Ek tool choose karo — Claude ya ChatGPT, dono nahi',
    calculateSaving: (tool) => tool.monthlySpend,
    reason: 'Coding ke liye dono use karna redundant hai — Claude coding mein better hai',
    credexRelevant: true,
  },

  // Rule 3: Paying for GitHub Copilot + Cursor both
  {
    id: 'duplicate_code_completion',
    applies: (tool, form) => {
      const hasCopilot = form.tools.some(t => t.tool === 'github_copilot')
      const hasCursor = form.tools.some(t => t.tool === 'cursor')
      return (
        (tool.tool === 'github_copilot') &&
        hasCopilot &&
        hasCursor
      )
    },
    recommendation: 'GitHub Copilot drop karo — Cursor already better code completion deta hai',
    calculateSaving: (tool) => tool.monthlySpend,
    reason: 'Cursor aur GitHub Copilot same kaam karte hain — dono rakhna paisa waste hai',
    credexRelevant: false,
  },

  // Rule 4: High spend — Credex credits suggest karo
  {
    id: 'high_spend_credex',
    applies: (tool) => tool.monthlySpend > 100,
    recommendation: 'Credex credits se 20-30% save karo retail price vs',
    calculateSaving: (tool) => tool.monthlySpend * 0.25, // 25% average saving
    reason: '$100+/mo spend pe Credex discounted credits substantial savings de sakte hain',
    credexRelevant: true,
  },

  // Rule 5: API direct but low usage — Pro plan better
  {
    id: 'api_low_usage',
    applies: (tool) =>
      (tool.tool === 'anthropic_api' || tool.tool === 'openai_api') &&
      tool.monthlySpend < 20,
    recommendation: 'Claude Pro ya ChatGPT Plus try karo — flat rate sasta padega',
    calculateSaving: (tool) => Math.max(0, tool.monthlySpend - 20),
    reason: '$20/mo se kam API usage ke liye flat-rate Pro plan predictable aur often sasta hota hai',
    credexRelevant: false,
  },

  // Rule 6: Max plan with single user
  {
    id: 'max_plan_single_user',
    applies: (tool, form) =>
      tool.plan === 'Max' && form.teamSize === 1,
    recommendation: 'Pro plan pe downgrade karo',
    calculateSaving: () => 80, // Max ($100) - Pro ($20) = $80
    reason: 'Single user ke liye Max plan ($100/mo) overkill — Pro ($20/mo) kaafi hai',
    credexRelevant: false,
  },
]

// ============================================
// MAIN AUDIT FUNCTION
// ============================================

export function runAudit(formData: FormData): AuditReport {
  const results: AuditResult[] = []

  for (const tool of formData.tools) {
    // Is tool pe kaunse rules apply hote hain?
    const applicableRules = AUDIT_RULES.filter(rule =>
      rule.applies(tool, formData)
    )

    if (applicableRules.length === 0) {
      // Koi issue nahi — optimal spending
      results.push({
        tool: tool.tool,
        currentSpend: tool.monthlySpend,
        recommendedAction: 'Current plan theek hai',
        potentialSaving: 0,
        reason: 'Tumhara plan aur usage aligned hai — koi optimization nahi',
        credexRelevant: false,
      })
    } else {
      // Sabse badi saving wala rule choose karo
      const bestRule = applicableRules.reduce((best, rule) =>
        rule.calculateSaving(tool) > best.calculateSaving(tool) ? rule : best
      )

      results.push({
        tool: tool.tool,
        currentSpend: tool.monthlySpend,
        recommendedAction: bestRule.recommendation,
        potentialSaving: Math.min(
          bestRule.calculateSaving(tool),
          tool.monthlySpend // saving spend se zyada nahi ho sakti
        ),
        reason: bestRule.reason,
        credexRelevant: bestRule.credexRelevant,
      })
    }
  }

  const totalMonthlySavings = results.reduce(
    (sum, r) => sum + r.potentialSaving, 0
  )

  return {
    results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
  }
}