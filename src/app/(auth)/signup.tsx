import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import LogoHeader from '@/components/section-heading/logo-header'
import { ILogin, IUser } from '@/types'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '@/components/section-heading/auth-header'
import InputField from '@/components/shared/InputField'
import CustomButton from '@/components/shared/CustomButton'
import * as Yup from 'yup';
import { AntDesign } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'expo-status-bar'


const Signup = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<IUser>({
        email: '',
        password: '',
        fullName: '',
        telephone: '',
        role: 'user'
    })

    const [error, setError] = useState<string>('')
    const { register } = useAuthStore()

    const validateSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must atleast 6 characters!').required('Password is required'),
        fullName: Yup.string().required('Full name is required'),
        telephone: Yup.string().required('Telephone is required')
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
            const data = await register(formData);
            if (data.body) {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome, successful login! 👋'
                });
                router.push('/(auth)/login');
            } else {
                Toast.show({
                    type: 'error',
                    text1: ` ${data?.message} 😡 `
                });
            }
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
            <StatusBar style='light' />
            <View className='h-6' />
            <ScrollView className='bg-white rounded-t-xl py-4 px-6' style={{ height: "50%" }}>
                <LogoHeader />
                <AuthHeader title='Enjoy now,' description='Feel free to enjoy, order best meals !' />
                <View>
                    <InputField
                        title="Full Name"
                        value={formData.fullName}
                        handleChangeText={(e) => setFormData({ ...formData, fullName: e })}
                        placeholder='Enter your full name'
                        prefix='user'
                    />
                    <InputField
                        title="Email"
                        value={formData.email}
                        handleChangeText={(e) => setFormData({ ...formData, email: e })}
                        placeholder='Enter your email'
                        keyboardType='email-address'
                        prefix='envelope-o'
                        otherStyles='mt-4'
                    />
                    <InputField
                        title="Telephone"
                        value={formData.telephone}
                        handleChangeText={(e) => setFormData({ ...formData, telephone: e })}
                        placeholder='Enter your telephone'
                        keyboardType='phone-pad'
                        prefix='phone'
                        otherStyles='mt-4'
                    />
                    <InputField
                        title="Password"
                        value={formData.password}
                        placeholder='Enter your password'
                        handleChangeText={(e) => setFormData({ ...formData, password: e })}
                        otherStyles='mt-4'
                        prefix='key'
                    />

                    {error && <View className='flex flex-1 flex-row items-center mt-2 justify-start'>
                        <AntDesign name='warning' size={16} color='red' />
                        <Text className='text-red-500 font-medium text-sm ml-4'>{error}</Text>
                    </View>}
                    <CustomButton
                        title="Register"
                        handlePress={handleSubmit}
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
        </SafeAreaView>
    )
}

export default Signup