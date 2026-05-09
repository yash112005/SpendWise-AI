// lib/__tests__/auditEngine.test.ts

import test from 'node:test'
import { runAudit } from '../auditEngine'
import type { FormData } from '@/types'

function expect(value: any) {
  return {
    toBeGreaterThan: (n: number) => {
      if (!(value > n)) {
        throw new Error(`Expected ${value} to be greater than ${n}`)
      }
    },

    toBe: (n: any) => {
      if (value !== n) {
        throw new Error(`Expected ${value} to be ${n}`)
      }
    },

    toContain: (str: string) => {
      if (!value.includes(str)) {
        throw new Error(`Expected "${value}" to contain "${str}"`)
      }
    },

    toBeTruthy: () => {
      if (!value) {
        throw new Error(`Expected value to be truthy`)
      }
    },
  }
}

// Test 1: Team plan with <=3 users should suggest downgrade
test('Team plan with <=3 users should suggest downgrade', () => {
  const form: FormData = {
    tools: [
      {
        tool: 'claude',
        plan: 'Team Standard',
        monthlySpend: 150,
        seats: 3,
      },
    ],
    teamSize: 3,
    useCase: 'mixed',
  }

  const report = runAudit(form)

  expect(report.results[0].potentialSaving).toBeGreaterThan(0)

  expect(report.results[0].recommendedAction).toContain('Credex')
})