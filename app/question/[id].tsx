import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useQuestionStore } from "@/features/questions/question.store";
import { useAuthStore } from "@/features/auth/useAuthStore";
import dayjs from "dayjs";
import { useState } from "react";

export default function QuestionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { questions, addComment, updateQuestion } = useQuestionStore();
  const user = useAuthStore((s) => s.user);

  const question = questions.find((q) => q.id === id);
  const [commentText, setCommentText] = useState("");

  if (!question) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Question not found</Text>
      </View>
    );
  }

  const isAuthor = user === question.author;

  return (
    <View className="flex-1 bg-white p-4">
      
      {/* Back */}
      <Pressable onPress={() => router.back()}>
        <Text className="text-blue-500 mb-4">← Back</Text>
      </Pressable>

      {/* Title */}
      <Text className="text-xl font-bold">{question.title}</Text>

      {/* Status */}
      <View className="mt-2 mb-2">
        <Text className="text-sm text-gray-500">
          Status: {question.status.toUpperCase()}
        </Text>
      </View>

      {/* Author + Date */}
      <Text className="text-xs text-gray-400 mb-4">
        by {question.author} • {dayjs(question.createdAt).format("DD MMM YYYY")}
      </Text>

      {/* Description */}
      <Text className="text-base mb-6">{question.description}</Text>

      {/* Edit Status (Author Only) */}
      {isAuthor && (
        <View className="flex-row gap-2 mb-6">
          {["open", "answered", "closed"].map((status) => (
            <Pressable
              key={status}
              onPress={() => updateQuestion(question.id, { status: 'answered' })}
              className={`px-3 py-1 rounded-full border ${
                question.status === status
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <Text
                className={
                  question.status === status
                    ? "text-white text-xs"
                    : "text-gray-600 text-xs"
                }
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Comments Section */}
      <Text className="text-lg font-semibold mb-3">
        Comments ({question.comments.length})
      </Text>

      <FlatList
        data={question.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-3 p-3 bg-gray-100 rounded-lg">
            <Text className="text-sm">{item.content}</Text>
            <Text className="text-xs text-gray-400 mt-1">
              {item.author} • {dayjs(item.createdAt).format("DD MMM HH:mm")}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 text-sm mb-4">
            No comments yet.
          </Text>
        }
      />

      {/* Add Comment */}
      {user && (
        <View className="mt-4">
          <TextInput
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
            className="border border-gray-300 rounded-lg p-3 mb-2"
          />

          <Pressable
            onPress={() => {
              if (!commentText.trim()) return;
              addComment(question.id, commentText, user);
              setCommentText("");
            }}
            className="bg-blue-500 p-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold">Add Comment</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
