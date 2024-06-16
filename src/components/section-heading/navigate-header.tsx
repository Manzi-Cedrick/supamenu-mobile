import { Image, Pressable } from 'react-native'
import React from 'react'
import { View } from '../shared/Themed'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import LogoHeader from './logo-header'
import { useAuthStore } from '@/components/hooks/store/useAuthStore'

interface NestedNavigationHeaderProps {
    navigateBack: () => void
}
const NestedNavigationHeader = (navigation: NestedNavigationHeaderProps) => {
    const { user } = useAuthStore()
    return (
        <View className="flex flex-row justify-between items-center">
            <Pressable
                onPress={navigation.navigateBack}
                className="flex w-9 h-9 rounded-full items-center flex-col p-2 border border-primary"
            >
                <FontAwesome name="long-arrow-left" color={'#F7941C'} size={16} />
            </Pressable>
            <LogoHeader />
            <Image
                height={32}
                width={32}
                className="rounded-full"
                source={{
                    uri: `https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`,
                }}
            />
        </View>
    )
}

export default NestedNavigationHeader