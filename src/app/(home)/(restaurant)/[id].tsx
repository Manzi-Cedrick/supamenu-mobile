import { Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRestaurants, useRestaurantStore } from '@/components/hooks/store/useRestaurantStore';
import { useMenu, useMenuStore } from '@/components/hooks/store/useMenuStore';
import NestedNavigationHeader from '@/components/section-heading/navigate-header';
import { Text, View } from '@/components/shared/Themed';
import { IMenu, IRestaurant } from '@/types';

const RestaurantIndex = () => {
    const data = usePathname();
    const { restaurants } = useRestaurants();
    const { menus } = useMenu();
    const restaurantTitle = data.slice(1);
    const restaurant = restaurants.find((item: IRestaurant) => item.title === decodeURI(restaurantTitle));
    const menu = menus.filter((item: IMenu) => item.restaurantId === restaurant?._id);
    const restaurant1 = require("@/assets/images/restaurants/restaurant1.png");
    const product1 = require("@/assets/images/products/product1.png");

    return (
        <SafeAreaView className='bg-white flex flex-1 flex-col px-8 py-4'>
            <ScrollView>
                <View>
                    <View className="flex justify-center items-center">
                        <Image className="rounded-md w-full h-40 bg-cover" source={restaurant1} />
                    </View>
                    <Text className='text-xl font-bold mt-4'>{decodeURI(restaurantTitle)}</Text>
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
                        {menu.map((item, index) => (
                            <Pressable
                                onPress={() => router.replace(`/(home)/(product)/${item._id.toString()}`)}
                                key={index}
                                className='flex flex-row justify-start items-center border-b border-gray-200 py-4'
                            >
                                <Image className='h-12 w-12 border border-primary rounded-md' source={product1} />
                                <View className='ml-4'>
                                    <Text className='font-semibold'>{item.name}</Text>
                                    <Text className='text-gray-400'>{item.description}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RestaurantIndex;
