import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const ShortError = ({error}: {error:string}) => {
    return (
        <View className='flex flex-1 flex-row items-center mt-1 justify-start'>
            <AntDesign name='warning' size={16} color='red' />
            <Text className='text-red-500 font-medium text-sm ml-4'>{error}</Text>
        </View>
    );
}

export default ShortError