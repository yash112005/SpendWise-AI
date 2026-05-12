import type { Metadata } from 'next'
import AuditClient from './AuditClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/audit?id=${id}`,
    {
      cache: 'no-store',
    }
  )

  const audit = await res.json()

  const savings = audit.totalMonthlySavings?.toFixed(0) || '0'

  return {
    title: `Maine $${savings}/mo save kiya AI tools pe`,
    description:
      "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <AuditClient id={id} />
}