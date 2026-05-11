// app/api/summary/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
})

export async function POST(request: NextRequest) {
  const { report, formData } = await request.json()

  // Fallback summary
  const fallbackSummary = `Tumhara AI stack ${formData.tools.length} tools use karta hai 
aur tumhari team $${report.totalMonthlySavings.toFixed(0)}/month save kar sakti hai 
simple optimizations se. Sabse bada opportunity hai ${
    report.results.sort(
      (a: any, b: any) => b.potentialSaving - a.potentialSaving
    )[0]?.tool
  } plan optimize karna.`

  try {
    const prompt = `
You are an AI spending advisor.

Write a personalized 80-100 word summary for this audit result.

Team info:
- Team size: ${formData.teamSize}
- Primary use case: ${formData.useCase}
- Total tools: ${formData.tools.length}

Audit results:
${report.results
  .map(
    (r: any) =>
      `- ${r.tool}: $${r.currentSpend}/mo, save $${r.potentialSaving}/mo — ${r.recommendedAction}`
  )
  .join('\n')}

Total potential savings:
$${report.totalMonthlySavings}/month
($${report.totalAnnualSavings}/year)

Write a friendly, specific, actionable summary.
Mention their biggest savings opportunity.
End with encouragement.
Do not use bullet points.
`

    const result = await model.generateContent(prompt)

    const summary = result.response.text()

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Gemini API error:', error)

    return NextResponse.json({
      summary: fallbackSummary,
    })
  }
}