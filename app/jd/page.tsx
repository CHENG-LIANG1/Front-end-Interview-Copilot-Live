'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { analyzeJD } from '@/lib/ai/analyzeJD'
import { saveJobDescription } from '@/lib/storage/jdStorage'
import type { JobDescription } from '@/types/jd'

export default function JDPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [content, setContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  async function handleAnalyze() {
    if (!content.trim()) return

    setIsAnalyzing(true)

    try {
      const analysis = await analyzeJD(content)

      const jd: JobDescription = {
        id: crypto.randomUUID(),
        title: title || '未命名岗位',
        company,
        content,
        analysis,
        createdAt: new Date().toISOString(),
      }

      saveJobDescription(jd)

      router.push(`/jd/${jd.id}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">JD 分析</h1>
        <p className="mt-2 text-muted-foreground">
          粘贴一个前端岗位 JD，系统会分析技能要求并生成学习建议。
        </p>
      </div>

      <div className="space-y-4">
        <input
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="岗位名称，例如：高级前端工程师"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="公司名称，可选"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <textarea
          className="min-h-80 w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="把 JD 粘贴到这里"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <button
          className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition hover:opacity-95 disabled:opacity-50 disabled:hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !content.trim()}
        >
          {isAnalyzing ? '分析中...' : '开始分析'}
        </button>
      </div>
    </main>
  )
}
