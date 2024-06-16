import { View, Text } from 'react-native'
import React from 'react'

const AuthHeader = ({title, description}: {title: string,description: string}) => {
    return (
        <View className='flex flex-col items-start py-4'>
            <Text className='text-xl font-bold'>{title}</Text>
            <Text className='text-gray-400 text-center'>{description}</Text>
        </View>
    )
}

export default AuthHeader