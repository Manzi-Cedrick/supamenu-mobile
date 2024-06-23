import { View, Text } from 'react-native'
import React from 'react'

const AuthHeader = ({title, description}: {title: string,description: string}) => {
    return (
        <View className='flex flex-col items-start pt-4'>
            <Text className='text-xl font-PoppinsBold'>{title}</Text>
            <Text className='text-gray-400 font-PoppinsLight text-center'>{description}</Text>
        </View>
    )
}

export default AuthHeader