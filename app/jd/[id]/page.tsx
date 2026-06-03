'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getJobDescriptionById } from '@/lib/storage/jdStorage'
import type { JobDescription } from '@/types/jd'

export default function JDDetailPage() {
  const params = useParams<{ id: string }>()
  const jd = useMemo<JobDescription | null>(() => {
    if (!params.id) return null
    return getJobDescriptionById(params.id) ?? null
  }, [params.id])

  if (!jd) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p>没有找到该 JD 分析记录。</p>
      </main>
    )
  }

  const analysis = jd.analysis

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">{jd.company || '未知公司'}</p>
        <h1 className="mt-1 text-3xl font-bold">{jd.title}</h1>
      </div>

      {analysis && (
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">岗位总结</h2>
            <p className="mt-3 text-foreground/90">{analysis.summary}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              岗位级别：{analysis.level}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">核心技能</h2>
            <div className="mt-4 space-y-4">
              {analysis.requiredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-lg border border-border bg-muted p-4"
                >
                  <div className="flex items-center justify-between">
                    <strong>{skill.name}</strong>
                    <span className="text-sm text-muted-foreground">
                      重要度：{skill.importance}/5
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {skill.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">前端知识点</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.frontendTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground/90"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">学习建议</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
              {analysis.studySuggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}
