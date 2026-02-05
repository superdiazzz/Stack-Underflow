import { View, Text } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuthStore } from "@/features/auth/useAuthStore";

export default function Index() {
  const user = useAuthStore((s) => s.user);
  
  if(!user){
    return <Redirect href="/login" />
  }
  return <Redirect href="/questions" />;
}
