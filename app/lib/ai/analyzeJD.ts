import type { JDAnalysis } from '@/types/jd'

export async function analyzeJD(content: string): Promise<JDAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const lowerContent = content.toLowerCase()

  const hasReact = lowerContent.includes('react')
  const hasTypeScript =
    lowerContent.includes('typescript') || lowerContent.includes('ts')
  const hasNode = lowerContent.includes('node')
  const hasAI =
    lowerContent.includes('ai') ||
    lowerContent.includes('llm') ||
    lowerContent.includes('agent') ||
    lowerContent.includes('rag')

  return {
    level: content.length > 800 ? 'senior' : 'middle',
    summary:
      '该岗位偏向中高级前端工程师，重点考察 React、TypeScript、工程化、性能优化和业务复杂度处理能力。',
    requiredSkills: [
      {
        name: hasReact ? 'React' : '现代前端框架',
        category: 'react',
        importance: 5,
        reason: '岗位核心开发框架，需要理解组件设计、状态管理和性能优化。',
      },
      {
        name: hasTypeScript ? 'TypeScript' : '类型化开发',
        category: 'typescript',
        importance: 5,
        reason: '中高级前端需要用类型系统提升大型项目可维护性。',
      },
      {
        name: '前端工程化',
        category: 'engineering',
        importance: 4,
        reason: '涉及构建、规范、模块化、代码质量和团队协作。',
      },
      {
        name: '性能优化',
        category: 'performance',
        importance: 4,
        reason: '中高级岗位通常会考察首屏、运行时性能和复杂页面优化。',
      },
    ],
    bonusSkills: [
      ...(hasNode
        ? [
            {
              name: 'Node.js',
              category: 'fullstack' as const,
              importance: 4 as const,
              reason: '具备全栈能力可以独立完成接口、数据处理和服务端逻辑。',
            },
          ]
        : []),
      ...(hasAI
        ? [
            {
              name: 'AI / Agent 应用开发',
              category: 'ai' as const,
              importance: 5 as const,
              reason: '岗位包含 AI 相关能力，理解 LLM、RAG、Agent 会明显加分。',
            },
          ]
        : []),
    ],
    frontendTopics: [
      'JavaScript 事件循环',
      'Promise 与异步控制',
      'React 渲染机制',
      'Hooks 原理',
      'TypeScript 泛型',
      '浏览器渲染流程',
      '前端性能优化',
    ],
    fullstackTopics: hasNode
      ? ['Node.js 基础', 'API 设计', '数据库建模', '鉴权与权限']
      : ['Next.js 基础', 'API 设计入门'],
    aiTopics: hasAI
      ? ['Prompt Engineering', 'Structured Output', 'RAG', 'Tool Calling', 'Agent Workflow']
      : ['AI Chat UI', 'LLM API 调用基础'],
    studySuggestions: [
      '优先复习 React、TypeScript 和浏览器原理。',
      '准备 3 个项目深挖故事：性能优化、组件抽象、复杂状态处理。',
      '补充一个 AI 相关作品，用 JD 分析或模拟面试 Agent 作为主线。',
    ],
  }
}