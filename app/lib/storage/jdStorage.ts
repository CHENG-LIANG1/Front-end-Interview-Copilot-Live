import type { JobDescription } from '@/types/jd'

const STORAGE_KEY = 'frontend-interview-copilot:jds'

export function getJobDescriptions(): JobDescription[] {
  if (typeof window === 'undefined') return []

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) return []

  try {
    return JSON.parse(raw) as JobDescription[]
  } catch {
    return []
  }
}

export function saveJobDescription(jd: JobDescription) {
  const list = getJobDescriptions()
  const nextList = [jd, ...list]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
}

export function getJobDescriptionById(id: string): JobDescription | undefined {
  return getJobDescriptions().find((item) => item.id === id)
}