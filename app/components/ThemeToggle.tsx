'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'frontend-interview-copilot:theme'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function applyMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialMode())

  useEffect(() => {
    applyMode(mode)
  }, [mode])

  function toggle() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <button
      type="button"
      aria-label={mode === 'dark' ? '切换到浅色' : '切换到深色'}
      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-card p-2 text-card-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={toggle}
    >
      {mode === 'dark' ? (
        <Sun aria-hidden="true" data-icon="inline-start" />
      ) : (
        <Moon aria-hidden="true" data-icon="inline-start" />
      )}
    </button>
  )
}
