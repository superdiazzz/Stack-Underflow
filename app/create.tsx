import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuestionStore } from "@/features/questions/question.store";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { router } from "expo-router";

const CreateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function CreateQuestion() {
  const addQuestion = useQuestionStore((s) => s.addQuestion);
  const user = useAuthStore((s) => s.user);

  return (
    <View className="flex-1 bg-gray-50">
      
      {/* <View className="bg-white border-b border-gray-200 px-4 pt-3 pb-3">
        <Text className="text-2xl font-bold text-gray-900">Ask a Question</Text>
      </View> */}
      

      <ScrollView className="flex-1 px-4 pt-4">
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={CreateSchema}
          onSubmit={(values) => {
            if (!user) return;

            addQuestion({
              title: values.title,
              description: values.description,
              author: user,
            });

            router.replace("/questions");
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-900 mb-2">Title</Text>
                <Text className="text-xs text-gray-500 mb-2">Be specific and imagine you're asking a question to another person</Text>
                <TextInput
                  placeholder="e.g. How do I center a div in React Native?"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  className="bg-white border border-gray-300 rounded-lg p-4 text-gray-900"
                  placeholderTextColor="#9ca3af"
                />
                {touched.title && errors.title && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.title}
                  </Text>
                )}
              </View>

              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-900 mb-2">Description</Text>
                <Text className="text-xs text-gray-500 mb-2">Include all the information someone would need to answer your question</Text>
                <TextInput
                  placeholder="Explain your question in detail..."
                  value={values.description}
                  onChangeText={handleChange("description")}
                  multiline
                  numberOfLines={8}
                  className="bg-white border border-gray-300 rounded-lg p-4 text-gray-900"
                  placeholderTextColor="#9ca3af"
                  style={{ textAlignVertical: "top", minHeight: 120 }}
                />
                {touched.description && errors.description && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </Text>
                )}
              </View>

              <Pressable
                onPress={() => handleSubmit()}
                className="bg-purple-500 p-4 rounded-lg items-center mb-8 active:bg-purple-600"
              >
                <Text className="text-white font-semibold text-base">
                  Post Your Question
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}