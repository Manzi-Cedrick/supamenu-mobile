// CustomHeader.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({ title, navigateBack }: { title: string, navigateBack: () => void }) => {
    return (
        <View className='bg-slate-50 pt-8 pb-2 border border-gray-100 shadow-xl shadow-black flex justify-start gap-x-4 items-center place-items-center flex-row px-8'>
            <Pressable
                onPress={navigateBack}
                className="flex w-8 h-8 rounded-full items-center flex-col border justify-center border-primary"
            >
                <FontAwesome name="long-arrow-left" color={'#F7941C'} size={12} />
            </Pressable>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
};

export default CustomHeader;
