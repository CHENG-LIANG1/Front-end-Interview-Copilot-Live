import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">
          Frontend Interview Copilot
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          用一个项目，系统提升前端面试与 AI 应用能力
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          粘贴 JD，分析岗位技能要求，生成知识点地图和学习计划。
        </p>

        <div className="mt-8">
          <Link
            href="/jd"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            开始分析 JD
          </Link>
        </div>
      </div>
    </main>
  )
}
