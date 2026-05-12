
"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AuditReport } from '@/types'

import { 
  CheckCircle2, 
  TrendingDown, 
  ExternalLink, 
  Share2, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Wrench
} from 'lucide-react'
import { EmailCapture } from '@/components/EmailCapture'

const TOOL_LABELS: Record<string, string> = {
  cursor: 'Cursor',
  github_copilot: 'GitHub Copilot',
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  anthropic_api: 'Anthropic API',
  openai_api: 'OpenAI API',
  gemini: 'Gemini',
  windsurf: 'Windsurf',
}


export default function AuditClient({
  id,
}: {
  id: string
}) {
  

  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  useEffect(() => {
    fetch(`/api/audit?id=${id}`)
      .then(r => r.json())
      .then(data => {
        console.log('API Response:', data)
        if (data.error) {
          setError(data.error)
        } else {
          setReport(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setError('Data load nahi hua')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-muted">
      <Loader2 className="w-12 h-12 animate-spin text-green-500 mb-6 drop-shadow-md" />
      <p className="text-muted-foreground animate-pulse font-medium text-lg tracking-wide">Audit report generate ho raha hai...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-6 bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-muted p-4 text-center">
      <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-full mb-2 shadow-sm border border-red-100 dark:border-red-900/30">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <p className="text-red-600 dark:text-red-400 font-semibold text-xl">Error: {error}</p>
      <Button variant="outline" className="mt-4 shadow-sm rounded-xl px-6" onClick={() => window.location.href = '/'}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Naya Audit Karo
      </Button>
    </div>
  )

  if (!report) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-muted">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground text-lg">Audit data nahi mila</p>
      </div>
    </div>
  )

  // Safe numbers — undefined aaye toh 0 use karo
  const monthlySavings = report.totalMonthlySavings ?? 0
  const annualSavings = report.totalAnnualSavings ?? 0
  const results = report.results ?? []

  const isHighSavings = monthlySavings > 500
  const isLowSavings = monthlySavings < 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-muted py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">

        {/* Hero Section */}
        <div className="relative overflow-hidden text-center rounded-3xl p-10 mb-10 border border-green-100 dark:border-green-900/30 bg-gradient-to-b from-green-50/80 to-emerald-100/40 dark:from-green-950/20 dark:to-emerald-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="absolute -top-10 -right-10 p-4 opacity-10 rotate-12">
            <Sparkles className="w-40 h-40 text-green-600" />
          </div>
          <div className="absolute -bottom-10 -left-10 p-4 opacity-[0.03] -rotate-12">
            <Sparkles className="w-40 h-40 text-green-600" />
          </div>
          
          <div className="relative z-10">
            <Badge variant="outline" className="mb-6 bg-white/50 dark:bg-black/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50 rounded-full px-5 py-1.5 shadow-sm font-semibold tracking-wide backdrop-blur-sm">
              Analysis Complete
            </Badge>
            <p className="text-muted-foreground mb-3 font-semibold tracking-widest uppercase text-sm">Potential Monthly Savings</p>
            <h1 className="text-7xl sm:text-8xl font-black mb-6 tracking-tighter">
              <span className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                ${monthlySavings.toFixed(0)}
              </span>
            </h1>
            <div className="flex justify-center">
              <p className="text-muted-foreground font-medium flex items-center justify-center gap-3 bg-white/60 dark:bg-black/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-border/50 shadow-sm">
                Estimated Annual Savings: 
                <span className="font-bold text-foreground text-xl">
                  ${annualSavings.toFixed(0)}/year
                </span>
              </p>
            </div>

            {isLowSavings && (
              <div className="mt-8 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-5 flex items-start gap-4 text-left shadow-sm max-w-lg mx-auto backdrop-blur-sm">
                <ShieldCheck className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-blue-900 dark:text-blue-200 text-sm font-medium leading-relaxed">
                  Tum well-optimized ho! AI subscriptions pe tumhara current spend ekdum optimal hai. Zaroorat se zyada kharcha nahi ho raha.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Credex CTA */}
        {isHighSavings && (
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white rounded-3xl p-8 sm:p-10 mb-10 shadow-2xl shadow-indigo-500/20 group">
            <div className="absolute -right-20 -top-20 bg-white/10 w-64 h-64 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 ease-in-out"></div>
            <div className="absolute -left-10 -bottom-10 bg-indigo-900/40 w-40 h-40 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-indigo-200" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Maximize Savings with Credex
                  </h2>
                </div>
                <p className="text-indigo-100/90 text-lg mb-0 leading-relaxed font-medium">
                  Unlock an additional <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md mx-1">${(monthlySavings * 0.3).toFixed(0)}/mo</span> in savings. Get premium access to Cursor, Claude, and ChatGPT at 20-40% below retail prices.
                </p>
              </div>
              <div className="w-full md:w-auto shrink-0">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl px-8 py-6 h-auto"
                  onClick={() => window.open('https://credex.rocks', '_blank')}
                >
                  Book Free Consultation <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Per-Tool Breakdown */}
        <div className="space-y-6 mt-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Wrench className="w-7 h-7 text-muted-foreground/50" /> Tool Breakdown
            </h2>
          </div>

          {results.length === 0 && (
            <div className="p-12 text-center border-2 border-dashed rounded-3xl bg-muted/20">
              <p className="text-muted-foreground text-lg">Koi tool data nahi mila.</p>
            </div>
          )}

          <div className="grid gap-5">
            {results.map((result, index) => {
              const currentSpend = result.currentSpend ?? 0
              const potentialSaving = result.potentialSaving ?? 0

              return (
                <Card 
                  key={result.tool} 
                  className="overflow-hidden border-border/60 bg-white/60 dark:bg-card/40 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-green-200 dark:hover:border-green-800/50 group"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                >
                  <CardHeader className="flex flex-row items-center justify-between py-5 bg-gradient-to-r from-muted/30 to-transparent border-b border-border/40">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      {TOOL_LABELS[result.tool] || result.tool}
                    </CardTitle>
                    <div className="flex flex-wrap justify-end items-center gap-2">
                      {result.credexRelevant && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 shadow-sm border border-purple-200 dark:border-purple-800 px-3 py-1 text-xs">
                          Credex Partner
                        </Badge>
                      )}
                      {potentialSaving > 0 ? (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md font-bold px-3 py-1 text-sm border-0">
                          Save ${potentialSaving.toFixed(0)}/mo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground border-border bg-background/50 px-3 py-1">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Optimal ✓
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-5 bg-muted/20 dark:bg-muted/10 p-4 rounded-2xl border border-border/50">
                      <div className="flex flex-col flex-1">
                        <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5">Current Spend</span>
                        <span className="text-2xl font-black text-foreground">${currentSpend}<span className="text-sm font-medium text-muted-foreground opacity-80">/mo</span></span>
                      </div>
                      
                      {potentialSaving > 0 && (
                        <>
                          <div className="flex flex-col items-center justify-center px-4">
                            <div className="w-12 sm:w-24 h-0.5 bg-gradient-to-r from-border to-green-300 dark:to-green-700 relative rounded-full">
                              <ArrowRight className="w-5 h-5 text-green-500 absolute -right-1 -top-2.5 bg-background dark:bg-card rounded-full" />
                            </div>
                          </div>
                          
                          <div className="flex flex-col flex-1 items-end">
                            <span className="text-[11px] text-green-600 dark:text-green-400 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                              <TrendingDown className="w-3.5 h-3.5" /> Target
                            </span>
                            <span className="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">${(currentSpend - potentialSaving).toFixed(0)}<span className="text-sm font-medium opacity-70">/mo</span></span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-2.5 bg-white/40 dark:bg-black/20 p-4 rounded-2xl border border-border/30">
                      <p className="text-base font-semibold text-foreground leading-snug">
                        {result.recommendedAction}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {result.reason}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Share + Email Capture */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-border/50">
          <Button
            variant="outline"
            size="lg"
            className="w-full font-semibold shadow-sm hover:bg-muted/60 rounded-2xl transition-all duration-300 h-14 text-base border-border/80"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Link copied!')
            }}
          >
            <Share2 className="w-5 h-5 mr-2.5" /> Share Report
          </Button>
          <Button 
            size="lg"
            className="w-full font-semibold rounded-2xl shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 h-14 text-base"
            onClick={() => setShowEmailCapture(true)}
          >
            <Mail className="w-5 h-5 mr-2.5" /> Email My Report
          </Button>
        </div>

        {/* New Audit */}
        <div className="text-center mt-10 pb-12">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl px-6 py-6 transition-colors" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Start New Audit
          </Button>
        </div>

        {/* Email Capture Dialog */}
        {report && (
          <EmailCapture 
            isOpen={showEmailCapture} 
            onClose={() => setShowEmailCapture(false)} 
            auditId={id} 
            report={report} 
          />
        )}
      </div>
    </div>
  )
}