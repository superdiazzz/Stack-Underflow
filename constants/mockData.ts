import { Question } from "@/features/questions/question.types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "Bagaimana cara membuat View ke tengah di React Native?",
    description:
      "Saya kesulitan membuat View berada di tengah secara vertikal dan horizontal. Bagaimana pengaturan flexbox yang benar?",
    status: "open",
    author: "nanda",
    createdAt: new Date("2026-02-01T10:00:00").toISOString(),
    comments: [
      {
        id: "c1",
        content: "Gunakan justifyContent dan alignItems yang diatur ke 'center'.",
        author: "alex",
        createdAt: new Date("2026-02-01T11:00:00").toISOString(),
      },
    ],
  },
  {
    id: "2",
    title: "Apa perbedaan antara useState dan useReducer?",
    description:
      "Kapan sebaiknya saya menggunakan useReducer alih-alih useState dalam aplikasi React?",
    status: "answered",
    author: "alex",
    createdAt: new Date("2026-02-02T09:30:00").toISOString(),
    comments: [
      {
        id: "c2",
        content:
          "useReducer lebih baik digunakan untuk logika state yang kompleks atau yang memiliki banyak sub-nilai.",
        author: "nanda",
        createdAt: new Date("2026-02-02T10:00:00").toISOString(),
      },
      {
        id: "c3",
        content: "Untuk toggle sederhana atau input biasa, useState sudah cukup.",
        author: "john",
        createdAt: new Date("2026-02-02T10:15:00").toISOString(),
      },
    ],
  },
  {
    id: "3",
    title: "Cara terbaik mengelola global state di React Native?",
    description:
      "Apa metode yang direkomendasikan untuk menangani global state di aplikasi React Native modern?",
    status: "closed",
    author: "john",
    createdAt: new Date("2026-02-03T08:00:00").toISOString(),
    comments: [],
  },
];