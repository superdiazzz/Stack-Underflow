export type QuestionStatus = 'open' | 'answered' | 'closed'

export interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

export interface Question {
  id: string
  title: string
  description: string
  status: QuestionStatus
  author: string
  createdAt: string
  comments: Comment[]
}
