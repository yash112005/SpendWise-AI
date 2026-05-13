import type { Metadata } from 'next'
import AuditClient from './AuditClient'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const res = await fetch(
      `${baseUrl}/api/audit?id=${params.id}`,
      {
        cache: 'no-store',
      }
    )

    const audit = await res.json()

    const savings =
      audit?.totalMonthlySavings?.toFixed?.(0) || '0'

    return {
      title: `Maine $${savings}/mo save kiya AI tools pe`,
      description:
        "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
    }
  } catch {
    return {
      title: 'AI Spend Audit',
      description:
        "Free AI spend audit — find out where you're overspending on Cursor, Claude, ChatGPT and more.",
    }
  }
}

export default function Page({ params }: Props) {
  return <AuditClient id={params.id} />
}