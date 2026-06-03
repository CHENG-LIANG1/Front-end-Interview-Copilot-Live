import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Frontend Interview Copilot',
  description: '前端 AI 面试作战系统（本地 MVP）',
}

const themeInitScript = `(function(){try{var k='frontend-interview-copilot:theme';var m=localStorage.getItem(k);var r=document.documentElement;var prefersDark=false;try{prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}catch(e){};if(m==='dark'){r.classList.add('dark');}else if(m==='light'){r.classList.remove('dark');}else{if(prefersDark)r.classList.add('dark');else r.classList.remove('dark');}}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              Frontend Interview Copilot
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <div className="flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  )
}
