import { View, Text } from '@/components/shared/Themed'
import { Image, Pressable } from "react-native";
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SingleProductProps {
    image: any,
    name: string,
    description: string,
    price: string
}

const SingleProduct =  ({ image, name, description, price }: SingleProductProps) => {
    return (
        <View>
            <Image className="bg-cover h-56 w-56 bg-center z-10" source={image} />
            <View className="bg-white p-4 rounded-md w-56 shadow-black">
                <View className="flex flex-row justify-between">
                    <View>
                        <Text className="text-black font-semibold">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-primary font-semibold">{price}</Text>
                    </View>
                    <View>
                        <Pressable className="border-2 p-2 rounded-full border-zinc-200 bg-zinc-100">
                            <FontAwesome onPress={() => console.log('Wishlish addition')} name="heart-o" size={18} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SingleProduct