import { View, TextInput, Button, Pressable, Text } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthStore } from '../features/auth/useAuthStore'
import { router } from 'expo-router'


const Login = () => {
  const login = useAuthStore((s) => s.login)

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={(values) => {
        login(values.username)
        router.replace('/')
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View className="flex-1 bg-gray-50 justify-center px-6">
          <View className="bg-white rounded-2xl p-8 shadow-sm">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome back</Text>
            <Text className="text-gray-500 mb-8">Sign in to continue</Text>
            
            <TextInput
              placeholder="Username"
              className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded-xl text-gray-900"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange('username')}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              className="bg-gray-50 border border-gray-200 p-4 mb-6 rounded-xl text-gray-900"
              placeholderTextColor="#9ca3af"
              onChangeText={handleChange('password')}
            />
            <Pressable 
              onPress={() => handleSubmit()}
              className="bg-purple-500 p-4 rounded-xl items-center active:bg-purple-600"
            >
              <Text className="text-white font-semibold text-base">Sign In</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  )
}

export default Login