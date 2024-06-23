import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'
import { IRestaurant } from '@/types'
import SkeletonLoaderRestaurant from './SkeletonRestaurant'

const SingleRestaurant = (item: IRestaurant) => {
    const [isLoading, setIsLoading] = useState(true);
    const restaurant1 = require("@/assets/images/restaurants/restaurant1.png");

    useEffect(() => {
        const loadImage = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadImage();
    }, [item.thumbnail]);

    if (isLoading) {
        return <SkeletonLoaderRestaurant />;
    }
    return (
        <Pressable onPress={() => router.push(`/(home)/(restaurant)/${item.title.toString()}`)}>
            <View className="bg-white border border-zinc-200 shadow-md shadow-[#edededbf] rounded-md my-2 p-4">
                <View className="flex justify-center items-center">
                    <Image className="rounded-md w-full h-32 bg-cover" source={restaurant1} />
                    <View className="pt-4 w-full">
                        <View className="flex flex-row justify-between">
                            <View>
                                <Text className="text- font-bold">{item.title}</Text>
                                <Text className="text-gray-400">Nice cuisine</Text>
                            </View>
                            <View className="flex flex-row">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <FontAwesome
                                        key={index}
                                        name={index <= item.rating ? "star" : index - 0.5 <= item.rating ? "star-half-o" : "star-o"}
                                        size={18}
                                        color="#FFD700"
                                    />
                                ))}
                            </View>
                        </View>
                        <Text className="py-2">{item.description}</Text>
                    </View>
                    <View className="flex flex-row justify-between w-full">
                        <Text className="text-slate-400"><FontAwesome name="location-arrow" /> Near your location</Text>
                        <Text className="text-slate-400">{item.status}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default SingleRestaurant