import { View, Text, TextInput, FlatList, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useQuestionStore } from "@/features/questions/question.store";
import { useAuthStore } from "@/features/auth/useAuthStore";
import dayjs from "dayjs";
import { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function QuestionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { questions, addComment, updateQuestion } = useQuestionStore();
  const user = useAuthStore((s) => s.user);
  const insets = useSafeAreaInsets();


  const question = questions.find((q) => q.id === id);
  const [commentText, setCommentText] = useState("");

  if (!question) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">Question not found</Text>
      </View>
    );
  }

  const isAuthor = user === question.author;

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView className="flex-1">
        <View className="bg-white border-b border-gray-200 p-4">
          <Text className="text-xl font-bold text-gray-900 leading-6 mb-3">
            {question.title}
          </Text>

          <View className="flex-row items-center mb-2">
            <Text className="text-sm text-gray-600">Asked by </Text>
            <Text className="text-sm font-medium text-gray-900">{question.author}</Text>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
            <Text className="text-sm text-gray-500">
              {dayjs(question.createdAt).format("MMM DD, YYYY")}
            </Text>
          </View>

          <View className={`self-start px-2 py-1 rounded ${
            question.status === 'answered' ? 'bg-green-100' :
            question.status === 'closed' ? 'bg-gray-100' : 'bg-blue-100'
          }`}>
            <Text className={`text-xs font-medium ${
              question.status === 'answered' ? 'text-green-700' :
              question.status === 'closed' ? 'text-gray-600' : 'text-blue-700'
            }`}>
              {question.status}
            </Text>
          </View>
        </View>

        <View className="bg-white p-4 mb-2">
          <Text className="text-base text-gray-700 leading-6">
            {question.description}
          </Text>
        </View>

        {isAuthor && (
          <View className="bg-white p-4 mb-2">
            <Text className="text-sm font-semibold text-gray-900 mb-2">Update Status</Text>
            <View className="flex-row gap-2">
              {["open", "answered", "closed"].map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateQuestion(question.id, { status: status as any })}
                  className={`px-4 py-2 rounded-lg ${
                    question.status === status
                      ? "bg-purple-500"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      question.status === status
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View className="bg-white p-4 mb-2">
          <Text className="text-base font-bold text-gray-900 mb-3">
            {question.comments.length} {question.comments.length === 1 ? 'Answer' : 'Answers'}
          </Text>

          {question.comments.length === 0 ? (
            <Text className="text-gray-400 text-sm py-4">
              No answers yet. Be the first to answer!
            </Text>
          ) : (
            question.comments.map((item) => (
              <View key={item.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0">
                <Text className="text-base text-gray-700 leading-6 mb-2">
                  {item.content}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-xs font-medium text-gray-900">
                    {item.author}
                  </Text>
                  <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />
                  <Text className="text-xs text-gray-500">
                    {dayjs(item.createdAt).format("MMM DD, YYYY")}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {user && (
        <View 
        className="bg-white border-t border-gray-200 p-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <TextInput
            placeholder="Write your answer..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3 text-gray-900"
            placeholderTextColor="#9ca3af"
            style={{ minHeight: 60, maxHeight: 100, textAlignVertical: "top" }}
          />

          <Pressable
            onPress={() => {
              if (!commentText.trim()) return;
              addComment(question.id, commentText, user);
              setCommentText("");
            }}
            className="bg-purple-500 p-3 rounded-lg items-center active:bg-purple-600"
          >
            <Text className="text-white font-semibold">Post Answer</Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}