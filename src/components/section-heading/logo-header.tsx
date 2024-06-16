import { Text, Image, Pressable, Easing } from 'react-native'
import Animated from 'react-native-reanimated'
import React from 'react'
import { router } from 'expo-router'

const LogoHeader = () => {
    return (
        <Pressable onPress={() => router.push('/')}>
            <Animated.View className='flex fixed flex-row justify-center items-center'>
                <Image source={require('@/assets/images/icon.png')} className="w-4 h-4 rounded-md" />
                <Text className='text-xl ml-2 font-bold text-primary'>Supa<Text className='text-black'>Menu</Text></Text>
            </Animated.View>
        </Pressable>
    )
}

export default LogoHeader