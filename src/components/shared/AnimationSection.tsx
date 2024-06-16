import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

interface AnimationSectionProps {
    title: string
    animation: string
}
const AnimationSection = ({ title, animation }: AnimationSectionProps) => {
    return (
        <View className='flex flex-col'>
            <LottieView source={animation} autoPlay loop style={{ width: 400, height: 400 }} />
            <Text className='font-regular text-center p-10 '>{title}</Text>
        </View>
    )
}

export default AnimationSection