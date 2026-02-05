import { create } from 'zustand'
import { Question } from './question.types'
import { mockQuestions } from '@/constants/mockData'

interface QuestionState {
  questions: Question[]
  addQuestion: (data: Pick<Question, 'title' | 'description' | 'author'>) => void
  updateQuestion: (
    id: string,
    data: Partial<Omit<Question, 'id' | 'comments' | 'createdAt'>>
  ) => void
  addComment: (questionId: string, content: string, author: string) => void
}

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: mockQuestions,

  addQuestion: (data) =>
    set((state) => ({
      questions: [
        {
          id: Date.now().toString(),
          title: data.title!,
          description: data.description!,
          status: 'open',
          author: data.author!,
          createdAt: new Date().toISOString(),
          comments: [],
        },
        ...state.questions,
      ],
    })),

  updateQuestion: (id, data) =>
  set((state) => ({
    questions: state.questions.map((q) =>
      q.id === id
        ? { ...q, ...data }
        : q
    ),
  })),

  addComment: (questionId, content, author) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              comments: [
                ...q.comments,
                {
                  id: Date.now().toString(),
                  content,
                  author,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : q
      ),
    })),
}))
