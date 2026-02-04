import { Question } from "@/features/questions/question.types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "How to center a View in React Native?",
    description:
      "I'm struggling to center a View both vertically and horizontally. What is the correct flexbox setup?",
    status: "open",
    author: "nanda",
    createdAt: new Date("2024-12-01T10:00:00").toISOString(),
    comments: [
      {
        id: "c1",
        content: "Use justifyContent and alignItems set to center.",
        author: "alex",
        createdAt: new Date("2024-12-01T11:00:00").toISOString(),
      },
    ],
  },
  {
    id: "2",
    title: "Difference between useState and useReducer?",
    description:
      "When should I use useReducer instead of useState in React applications?",
    status: "answered",
    author: "alex",
    createdAt: new Date("2024-12-02T09:30:00").toISOString(),
    comments: [
      {
        id: "c2",
        content:
          "useReducer is better for complex state logic or multiple sub-values.",
        author: "nanda",
        createdAt: new Date("2024-12-02T10:00:00").toISOString(),
      },
      {
        id: "c3",
        content: "For simple toggles or inputs, useState is enough.",
        author: "john",
        createdAt: new Date("2024-12-02T10:15:00").toISOString(),
      },
    ],
  },
  {
    id: "3",
    title: "Best way to manage global state in React Native?",
    description:
      "What is the recommended way to handle global state in modern React Native apps?",
    status: "closed",
    author: "john",
    createdAt: new Date("2024-12-03T08:00:00").toISOString(),
    comments: [],
  },
];
