import type { Metadata } from 'next'
import AuditClient from './AuditClient'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'

  try {
    const res = await fetch(
      `${baseUrl}/api/audit?id=${id}`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch audit')
    }

    const audit = await res.json()

    const savings =
      audit?.totalMonthlySavings?.toFixed?.(0) || '0'

    return {
      title: `Maine $${savings}/mo save kiya AI tools pe`,
      description:
        "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
      openGraph: {
        title: `Maine $${savings}/mo save kiya AI tools pe`,
        description:
          "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
        url: `${baseUrl}/audit/${id}`,
        siteName: 'AI Spend Audit',
        images: [
          {
            url: '/og.png',
            width: 1200,
            height: 630,
            alt: 'AI Spend Audit',
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Maine $${savings}/mo save kiya AI tools pe`,
        description:
          "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
        images: ['/og.png'],
      },
    }
  } catch {
    return {
      title: 'AI Spend Audit',
      description:
        "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
    }
  }
}

export default async function Page({
  params,
}: Props) {
  const { id } = await params

  return <AuditClient id={id} />
}