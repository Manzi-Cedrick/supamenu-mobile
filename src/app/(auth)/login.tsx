import { Image, Pressable, ScrollView, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'
import AuthHeader from '@/components/section-heading/auth-header'
import InputField from '@/components/shared/InputField'
import CustomButton from '@/components/shared/CustomButton'
import Toast from 'react-native-toast-message'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import ShortError from '@/components/shared/ShortError'
import { zodResolver } from '@hookform/resolvers/zod'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from '@/components/shared/Themed'
import Animated, { Easing, FadeIn, FadeInLeft, FadeInRight, Layout } from 'react-native-reanimated'
import { setEncToken, setUserInfoData } from '@/proxy/local-storage'

const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { login } = useAuthStore()

  const validateSchema = z.object({
    email: z.string().email('Invalid email format').min(6, { message: 'Email must be at least 6 characters!' }).trim().nonempty('Email cannot be empty'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters!' }).trim().nonempty('Password cannot be empty')
  });

  const { control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(validateSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      console.log('The data:', data)
      const response = await login(data.email, data.password);
      console.log('The data response: ', response)
      if (response.body && response.token) {
        setEncToken(response.token);
        setUserInfoData(response.body);
        Toast.show({
          type: 'success',
          text1: 'Welcome, successful login! 👋'
        });
        router.push('/(home)/(tabs)/');
      } else {
        Toast.show({
          type: 'error',
          text1: ` ${response?.message} 😡 `
        });
      }
      console.log('Reach')
      console.log(response);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred during login. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <ScrollView className='bg-white flex flex-1 rounded-t-xl py-4 px-6'>
      <Pressable onPress={() => router.push('/(auth)/login')}>
        <Animated.View key={'UniqueKey102'} entering={FadeInLeft.duration(1000).easing(Easing.in(Easing.ease))} className='flex fixed flex-row justify-center py-4 items-center'>
          <Image source={require('@/assets/images/icon.png')} className="w-12 h-12 rounded-md" />
          <Text className='text-xl font-PoppinsBold text-primary'>Supa<Text className='text-black font-PoppinsSemiBold'>Menu</Text></Text>
        </Animated.View>
      </Pressable>
      <AuthHeader title='Welcome back,' description='Feel free to check out, our latest updates !' />
      <Animated.View
        key={'UniqueKey101'}
        entering={FadeIn.duration(1500).easing(Easing.inOut(Easing.ease))}
      >
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              title="Email"
              value={value}
              placeholder='Enter your email'
              handleChangeText={onChange}
              otherStyles='mt-4'
              prefix='envelope-o'
            />
          )}
          name='email'
          rules={{ required: 'Email is required' }}
        />

        {errors.email?.message && typeof errors.email.message === 'string' && (
          <ShortError error={errors.email.message} />
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              title="Password"
              value={value}
              placeholder='Enter your password'
              handleChangeText={onChange}
              otherStyles='mt-4'
              prefix='lock'
            />
          )}
          name='password'
          rules={{ required: 'Password is required' }}
        />
        {errors.password?.message && typeof errors.password.message === 'string' && (
          <ShortError error={errors.password.message} />
        )}
        <CustomButton
          title="Sign In"
          handlePress={handleSubmit(onSubmit)}
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
      </Animated.View>

      <View>
        <Text className='text-center mt-4 text-slate-500'>
          Don't have an account ? <Link href={'/(auth)/signup'} className='text-primary font-medium'>Sign Up</Link>
        </Text>
      </View>
    </ScrollView>
  )
}

export default Login
