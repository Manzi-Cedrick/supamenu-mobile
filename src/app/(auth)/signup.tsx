import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import LogoHeader from '@/components/section-heading/logo-header'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/components/section-heading/auth-header'
import InputField from '@/components/shared/InputField'
import CustomButton from '@/components/shared/CustomButton'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'expo-status-bar'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form'
import ShortError from '@/components/shared/ShortError'
import { Text, View } from '@/components/shared/Themed'

const Signup = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { register } = useAuthStore();

    const validateSchema = z.object({
        email: z.string().email('Invalid email format').min(6, { message: 'Email must be at least 6 characters!' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
        fullName: z.string().min(3, { message: 'Full name must be at least 3 characters!' }),
        telephone: z.string().min(10, { message: 'Telephone must be at least 10 characters!' })
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validateSchema),
        mode: 'onChange'
    });

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

        <ScrollView className='bg-white rounded-t-xl py-4 px-6 flex flex-1 h-screen'>
            <LogoHeader />
            <AuthHeader title='Enjoy now,' description='Feel free to enjoy, order best meals !' />
            <View>
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
            </View>

            <View>
                <Text className='text-center mt-4 text-slate-500'>
                    Already have an account ? <Link href={'/(auth)/login'} className='text-primary font-medium'>Login</Link>
                </Text>
            </View>
        </ScrollView>
    )
}

export default Signup