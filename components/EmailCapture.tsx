"use client"

import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, CheckCircle2, AlertCircle } from 'lucide-react'

interface EmailCaptureProps {
  isOpen: boolean
  onClose: () => void
  auditId: string
  report: any
}

export function EmailCapture({ isOpen, onClose, auditId, report }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, auditId, report }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setEmail('')
        }, 3000)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl">
        {!success ? (
          <>
            <DialogHeader className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center tracking-tight">
                Get Your Report via Email
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400 text-base">
                Enter your email address and we'll send you the full analysis report for your records.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold ml-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all text-base"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-900/50">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <DialogFooter className="sm:justify-start">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                    </>
                  ) : (
                    'Send Report'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">Report Sent!</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-[250px]">
              Your AI spend analysis report has been sent to {email}.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}