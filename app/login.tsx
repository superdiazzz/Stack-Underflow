import { View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthStore } from '../features/auth/useAuthStore'


const Login = () => {
  const login = useAuthStore((s) => s.login)

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={(values) => login(values.username)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View className="flex-1 justify-center p-6 bg-white">
          <TextInput
            placeholder="Username"
            className="border p-3 mb-4 rounded"
            onChangeText={handleChange('username')}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border p-3 mb-4 rounded"
            onChangeText={handleChange('password')}
          />
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  )
}

export default Login