import { Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { router, usePathname } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRestaurantStore } from '@/components/hooks/store/useRestaurantStore'
import { useMenuStore } from '@/components/hooks/store/useMenuStore'
import NestedNavigationHeader from '@/components/section-heading/navigate-header'
import { Text, View } from '@/components/shared/Themed'

const RestaurantIndex = () => {
    const data = usePathname();
    const { restaurants } = useRestaurantStore();
    const { fetchMenus, menus } = useMenuStore();
    const restaurant = restaurants.find((item) => item.title === data.slice(1));
    useEffect(() => {
        fetchMenus()
    }, [])
    const menu = menus.filter((item) => item.restaurantId === restaurant?._id);
    console.log(menu)
    return (
        <ScrollView className='bg-white flex flex-1 flex-col p-8 pt-16'>
            <NestedNavigationHeader navigateBack={() => router.replace('/(home)/(tabs)/restaurants')} />
            <View>
                <View className="flex justify-center pt-4 items-center">
                    <Image className="rounded-md w-full h-40 bg-cover" source={{ uri: restaurant?.thumbnail }} />
                </View>
                <Text className='text-xl font-bold mt-4'>{data.slice(1)}</Text>
                <Text className='text-gray-400 pt-2'>{restaurant?.description}</Text>
                <View className="flex flex-row py-4">
                    {restaurant?.rating ? [1, 2, 3, 4, 5].map((index) => (
                        <FontAwesome
                            key={index}
                            name={index <= restaurant?.rating ? "star" : index - 0.5 <= restaurant?.rating ? "star-half-o" : "star-o"}
                            size={18}
                            color="#FFD700"
                        />
                    )) : null}
                </View>
                <View className="flex flex-row justify-between w-full">
                    <Text className="text-slate-400"><FontAwesome name="location-arrow" /> Near your location</Text>
                    <Text className="text-slate-400">{restaurant?.status}</Text>
                </View>
            </View>
            <View>
                <Text className='text-lg font-semibold text-black mt-4'>Menu</Text>
                <View>
                    {menu.map((item, index) => {
                        console.log(item.name)
                        return (
                            <Pressable onPress={() => router.replace(`/(home)/(product)/${item._id.toString()}`)} key={index} className='flex flex-row justify-start items-center border-b border-gray-200 py-4'>
                                <Image className='h-12 w-12 border border-primary rounded-md' source={{ uri: item.icon }} />
                                <View className='ml-4'>
                                    <Text className='font-semibold'>{item.name}</Text>
                                    <Text className='text-gray-400'>{item.description}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

export default RestaurantIndex