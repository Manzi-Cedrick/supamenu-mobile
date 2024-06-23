import { View, Text } from 'react-native'
import React from 'react'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'

const AuthHeader = ({title, description}: {title: string,description: string}) => {
    return (
        <Animated.View entering={FadeIn.duration(1500).easing(Easing.inOut(Easing.ease))} className='flex flex-col items-start pt-4'>
            <Text className='text-xl font-PoppinsSemiBold'>{title}</Text>
            <Text className='text-gray-400 font-PoppinsLight text-center'>{description}</Text>
        </Animated.View>
    )
}

export default AuthHeader