import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Stack Underflow</Text>
      <Link href="/login" className="mt-4 text-blue-500">
        Go to Login
      </Link>
    </View>
  );
}
