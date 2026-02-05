import { View, Text, FlatList, Pressable } from "react-native";
import { useQuestionStore } from "@/features/questions/question.store";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { router } from "expo-router";
import dayjs from "dayjs";

export default function QuestionsScreen() {
  const { questions } = useQuestionStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 pt-3 pb-3">
        <View className="flex-row justify-between items-center">
            <View></View>
          {/* <Text className="text-2xl font-bold text-gray-900">Questions</Text> */}
          <Pressable onPress={() => {
                logout();
                router.replace("/login");
            }} className="px-3 py-1.5">
            <Text className="text-purple-500 font-medium">Logout</Text>
          </Pressable>
        </View>
      </View>

      {/* Question List */}
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/question/${item.id}`)}
            className="mb-3 bg-white rounded-lg border border-gray-200 p-4 active:bg-gray-50"
          >
            <View className="flex-row items-start mb-2">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 leading-5">
                  {item.title}
                </Text>
              </View>
              <View className={`ml-2 px-2 py-1 rounded ${
                item.status === 'answered' ? 'bg-green-100' :
                item.status === 'closed' ? 'bg-gray-100' : 'bg-blue-100'
              }`}>
                <Text className={`text-xs font-medium ${
                  item.status === 'answered' ? 'text-green-700' :
                  item.status === 'closed' ? 'text-gray-600' : 'text-blue-700'
                }`}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text className="text-sm text-gray-600 leading-5 mb-3" numberOfLines={2}>
              {item.description}
            </Text>

            <View className="flex-row items-center">
              <Text className="text-xs text-gray-500">
                by {item.author}
              </Text>
              <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
              <Text className="text-xs text-gray-400">
                {dayjs(item.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-base">No questions yet</Text>
            <Text className="text-gray-400 text-sm mt-1">Be the first to ask!</Text>
          </View>
        }
      />

      {/* Add Question Button */}
      <Pressable
        onPress={() => router.push("/create")}
        className="absolute bottom-6 right-6 bg-purple-500 w-14 h-14 rounded-full items-center justify-center shadow-lg active:bg-purple-600"
      >
        <Text className="text-white text-2xl font-light">+</Text>
      </Pressable>
    </View>
  );
}