import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, auditId, report } = await request.json()

    if (!email || !auditId) {
      return NextResponse.json(
        { error: 'Email and Audit ID are required' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing')
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY to your .env file.' },
        { status: 500 }
      )
    }

    console.log(`[Email API] Sending report ${auditId} to ${email}`)

    // 1. Save lead to Supabase (if initialized)
    try {
      if (supabase) {
        await supabase
          .from('leads')
          .insert([{ 
            email, 
            audit_id: auditId,
            metadata: {
              monthlySavings: report?.totalMonthlySavings,
              annualSavings: report?.totalAnnualSavings
            }
          }])
      }
    } catch (dbError) {
      console.error('Database operation failed:', dbError)
    }

    // 2. Send Real Email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SpendWise AI <onboarding@resend.dev>', // Update this with your verified domain
      to: [email],
      subject: 'Your AI Spend Audit Report',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #10b981;">Your AI Spend Audit Result</h1>
          <p>Hello,</p>
          <p>Here is the summary of your AI spend audit. You have a potential savings opportunity!</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #dcfce7;">
            <h2 style="margin-top: 0; color: #065f46;">Potential Monthly Savings: $${report?.totalMonthlySavings?.toFixed(0)}</h2>
            <p style="font-weight: bold; font-size: 18px;">Annual Savings: $${report?.totalAnnualSavings?.toFixed(0)}/year</p>
          </div>

          <h3>Breakdown:</h3>
          <ul style="list-style: none; padding: 0;">
            ${report?.results?.map((r: any) => `
              <li style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${r.tool}</strong>: Currently spending $${r.currentSpend}/mo. 
                <br/>
                <span style="color: #10b981;">Recommendation: ${r.recommendedAction}</span>
              </li>
            `).join('')}
          </ul>

          <p style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/audit/${auditId}" 
               style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              View Full Report Online
            </a>
          </p>

          <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">
            Sent by SpendWise AI. To optimize your spend even further, visit <a href="https://credex.rocks">Credex</a>.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data 
    })
  } catch (error) {
    console.error('Email API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
