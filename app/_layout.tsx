import { QueryProvider } from "@/providers/QueryProvider"
import "./global.css"
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="questions" options={{ headerShown: true, title: 'Questions' }} />
          <Stack.Screen name="create" options={{ headerShown: true, title: 'Create Question' }} />
          <Stack.Screen name="question/[id]" options={{ headerShown: true, title: 'Question Details' }} />
      </Stack>
    </QueryProvider>
  )
}
