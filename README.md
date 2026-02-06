# Stack Underflow (React Native - Expo)

Stack Underflow adalah aplikasi Q&A sederhana berbasis React Native (Expo).
Aplikasi ini memungkinkan user untuk:

- Login (mocked authentication)

- Melihat daftar pertanyaan

- Membuat pertanyaan baru

- Mengubah status pertanyaan miliknya

- Memberikan komentar

- Mengedit status pertanyaan miliknya

Semua data disimpan di memory (tanpa backend).

# VIDEO 

Klik untuk video lebih panjang

[![Watch the video](https://cdn.loom.com/sessions/thumbnails/25e81f13368449fc9f2b879a84056c27-b377d8b4e1c62ba9-full-play.gif#t=0.1)](https://www.loom.com/share/25e81f13368449fc9f2b879a84056c27)

# Tech Stack

- Expo SDK 54

- React Native

- Expo Router

- Zustand (State Management)

- TanStack Query

- Formik + Yup (Form Validation)

- NativeWind (Tailwind for RN)

- TypeScript

# Installation Guide

1. Requirements

Node.js v20.x.x

npm

Expo Go (latest version)

Check Node version:

```
node -v
```

2. Install Dependencies

```
npm install --legacy-peer-deps
```

3. Start Development Server

```
npx expo start -c
```

Run on:

- Android Emulator

- iOS Simulator

- Expo Go App


# Project Structure

```
stack-underflow/
│
├── app/
│   ├── _layout.tsx        # Root layout + QueryProvider
│   ├── index.tsx          # Redirect logic
│   ├── login.tsx          # Login screen
│   ├── questions.tsx      # Question list
│   ├── create.tsx         # Create question
│   └── question/
│       └── [id].tsx       # Question detail
│
├── features/
│   ├── auth/
│   │   └── useAuthStore.ts
│   └── questions/
│       ├── question.store.ts
│       └── question.types.ts
│
├── providers/
│   └── QueryProvider.tsx
│
├── constants/
│   └── mockData.ts
│
├── tailwind.config.js
├── babel.config.js
├── tsconfig.json
└── README.md

```

# Application Flow

1. User opens app → redirected to Login

2. After login → redirected to Question List

3. User can:

 - View question detail

 - Add comment

 - Create new question

 - Change question status (if owner)

4. Logout → redirected back to Login

# Assumptions

- No backend required

- Data resets when app reloads

- No persistent storage

- No role-based permission system

# Notes

This project focuses on:

- Clean architecture

- Separation of concerns

- Feature-based folder structure

- State management best practices

- Scalable routing using Expo Router