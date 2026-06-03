export type SkillCategory =
  | 'frontend'
  | 'react'
  | 'typescript'
  | 'browser'
  | 'network'
  | 'performance'
  | 'engineering'
  | 'fullstack'
  | 'ai'

export interface SkillItem {
  name: string
  category: SkillCategory
  importance: 1 | 2 | 3 | 4 | 5
  reason: string
}

export interface JDAnalysis {
  level: 'junior' | 'middle' | 'senior' | 'expert'
  summary: string
  requiredSkills: SkillItem[]
  bonusSkills: SkillItem[]
  frontendTopics: string[]
  fullstackTopics: string[]
  aiTopics: string[]
  studySuggestions: string[]
}

export interface JobDescription {
  id: string
  title: string
  company?: string
  content: string
  analysis?: JDAnalysis
  createdAt: string
}