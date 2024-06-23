import { Text, Image, Pressable, Easing } from 'react-native'
import Animated, { FadeIn, FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated'
import React from 'react'
import { router } from 'expo-router'

const LogoHeader = () => {
    return (
        <Pressable onPress={() => router.push('/')}>
            <Animated.View key={'UniqueKey102'} entering={FadeInLeft.duration(500)} exiting={FadeInRight.duration(500)} className='flex fixed flex-row justify-center items-center'>
                <Image source={require('@/assets/images/icon.png')} className="w-8 h-8 rounded-md" />
                <Text className='text-xl ml-2 font-bold text-primary'>Supa<Text className='text-black'>Menu</Text></Text>
            </Animated.View>
        </Pressable>
    )
}

export default LogoHeader