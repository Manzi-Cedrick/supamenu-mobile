import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import LogoHeader from '@/components/section-heading/logo-header'
import { ILogin } from '@/types'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'
import * as SecureStorage from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/components/section-heading/auth-header'
import InputField from '@/components/shared/InputField'
import CustomButton from '@/components/shared/CustomButton'
import * as Yup from 'yup';
import { AntDesign } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'


const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const { login } = useAuthStore()

  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must atleast 6 characters!').required('Password is required')
  })
  const validateForm = async (data: ILogin) => {
    try {
      await validateSchema.validate(data, { abortEarly: false })
      setError('')
      return true
    } catch (error: any) {
      console.log(error)
      setError(error.errors[0])
      return false
    }
  }
  const handleSubmit = async () => {
    const isValid = await validateForm(formData);
    if (!isValid) {
      return;
    }
    setSubmitting(true);

    try {
      const data = await login(formData.email, formData.password);
      if (data.body && data.token) {
        await SecureStorage.setItemAsync('user', JSON.stringify(data.body));
        await SecureStorage.setItemAsync('token', data.token);
        Toast.show({
          type: 'success',
          text1: 'Welcome, successful login! 👋'
        });
        router.push('/(home)/(tabs)/');
      } else {
        Toast.show({
          type: 'error',
          text1: ` ${data?.message} 😡 `
        });
      }
      console.log('Reach')
      console.log(data);
    } catch (error: any) {
      console.log('Login error:', error.message);
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <SafeAreaView className='flex flex-1 h-screen bg-primary flex-col-revese'>
      <View className='h-20' />
      <ScrollView className='bg-white rounded-t-xl py-4 px-4' style={{ height: "50%" }}>
        <LogoHeader />
        <AuthHeader title='Welcome back,' description='Feel free to check out, our latest updates !' />
        <View>
          <InputField
            title="Email"
            value={formData.email}
            handleChangeText={(e) => setFormData({ ...formData, email: e })}
            placeholder='Enter your email'
            keyboardType='email-address'
            prefix='envelope-o'
          />
          <InputField
            title="Password"
            value={formData.password}
            placeholder='Enter your password'
            handleChangeText={(e) => setFormData({ ...formData, password: e })}
            otherStyles='mt-4'
            prefix='key'
          />
          {error && <View className='flex flex-1 flex-row items-center mt-4 justify-start'>
            <AntDesign name='warning' size={16} color='red' />
            <Text className='text-red-500 font-medium text-sm ml-4'>{error}</Text>
          </View>}
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="bg-primary text-white mt-4"
            isLoading={isSubmitting}
          />

          <View className='flex flex-row w-full py-4 items-center justify-center'>
            <View className='border-t w-1/3 border-slate-200'></View>
            <Text className='px-6 text-slate-500'>OR</Text>
            <View className='border-t w-1/3 border-slate-200'></View>
          </View>

          <TouchableHighlight
            onPress={() => alert('Feature coming soon!')}
            activeOpacity={0.7}
            underlayColor="#d3d3d3"
            className='bg-transparent border border-slate-700 flex flex-row justify-center items-center rounded-lg py-3.5'
          >
            <View className='flex flex-1 flex-row justify-center place-items-center items-center '>
              <Image source={require('@/assets/images/google.png')} className='w-4 h-4' />
              <Text className='text-slate-700 font-medium ml-4'>Continue with Google</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View>
          <Text className='text-center mt-4 text-slate-500'>
            Don't have an account ? <Link href={'/(auth)/signup'} className='text-primary font-medium'>Sign Up</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login