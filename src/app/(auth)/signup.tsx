import { Image, Pressable, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'
import AuthHeader from '@/components/section-heading/auth-header'
import InputField from '@/components/shared/InputField'
import CustomButton from '@/components/shared/CustomButton'
import Toast from 'react-native-toast-message'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form'
import ShortError from '@/components/shared/ShortError'
import { Text, View } from '@/components/shared/Themed'
import Animated, { Easing, FadeIn, FadeInLeft } from 'react-native-reanimated'

const Signup = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { register } = useAuthStore();

    const validateSchema = z.object({
        email: z.string().email('Invalid email format').min(6, { message: 'Email must be at least 6 characters!' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
        fullName: z.string().min(3, { message: 'Full name must be at least 3 characters!' }),
        telephone: z.string().min(10, { message: 'Telephone must be at least 10 characters!' })
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
            data.role = 'user';
            console.log('the data:', data)
            const response = await register(data);
            if (response.message === 'User created successfully' && response.body !== null) {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome, successful login! 👋'
                });
                router.push('/(auth)/login');
            } else {
                Toast.show({
                    type: 'error',
                    text1: ` ${response?.message} 😡 `
                });
            }
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
        <SafeAreaView className='bg-white rounded-t-xl  px-6  flex flex-1 h-screen'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={() => router.push('/')}>
                    <Animated.View key={'UniqueKey102'} entering={FadeInLeft.duration(1000).easing(Easing.in(Easing.ease))} className='flex fixed flex-row justify-center pt-10 items-center'>
                        <Image source={require('@/assets/images/icon.png')} className="w-12 h-12 rounded-md" />
                        <Text className='text-xl font-PoppinsBold text-primary'>Supa<Text className='text-black font-PoppinsSemiBold'>Menu</Text></Text>
                    </Animated.View>
                </Pressable>
                <AuthHeader title='Enjoy now,' description='Feel free to enjoy, order best meals !' />
                <Animated.View key={'UniqueKey102'} entering={FadeIn.duration(1500).easing(Easing.inOut(Easing.ease))} className={'pt-4'}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                title="Full Name"
                                value={value}
                                handleChangeText={onChange}
                                placeholder='Enter your full name'
                                prefix='user'
                                onBlur={onBlur}
                            />
                        )}
                        name='fullName'
                    />

                    {errors.fullName?.message && typeof errors.fullName.message === 'string' && (
                        <ShortError error={errors.fullName.message} />
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                title="Email"
                                value={value}
                                handleChangeText={onChange}
                                placeholder='Enter your email'
                                keyboardType='email-address'
                                prefix='envelope-o'
                                otherStyles='mt-4'
                                onBlur={onBlur}
                            />
                        )}
                        name='email'
                    />

                    {errors.email?.message && typeof errors.email.message === 'string' && (
                        <ShortError error={errors.email.message} />
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                title="Telephone"
                                value={value}
                                handleChangeText={onChange}
                                placeholder='Enter your telephone'
                                keyboardType='phone-pad'
                                prefix='phone'
                                otherStyles='mt-4'
                                onBlur={onBlur}
                            />
                        )}
                        name='telephone'
                    />

                    {errors.telephone?.message && typeof errors.telephone.message === 'string' && (
                        <ShortError error={errors.telephone.message} />
                    )}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                title="Password"
                                value={value}
                                handleChangeText={onChange}
                                placeholder='Enter your password'
                                otherStyles='mt-4'
                                prefix='key'
                                onBlur={onBlur}
                            />
                        )}
                        name='password'
                    />

                    {errors.password?.message && typeof errors.password.message === 'string' && (
                        <ShortError error={errors.password.message} />
                    )}

                    <CustomButton
                        title="Register"
                        handlePress={handleSubmit(onSubmit)}
                        containerStyles="bg-primary text-white mt-2"
                        isLoading={isSubmitting}
                    />
                </Animated.View>

                <View>
                    <Text className='text-center my-4 text-slate-500'>
                        Already have an account ? <Link href={'/(auth)/login'} className='text-primary font-medium'>Login</Link>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup