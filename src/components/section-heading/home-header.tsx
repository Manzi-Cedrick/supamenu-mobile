import { Image, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/shared/Themed';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useCartStore } from '@/components/hooks/store/useCartStore';
import { useAuthStore } from '@/components/hooks/store/useAuthStore';
import { Appbar, Avatar } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { getInitials } from '@/utils/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeAuthToken } from '@/utils/config';
import { removeUserInfoData } from '@/proxy/local-storage';

const HomeTabHeader = () => {
    const { cart } = useCartStore();
    const { user, logout } = useAuthStore();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const fullName = user?.fullName || '';
    const displayName = fullName.length > 5 ? `${fullName.slice(0, 5)}...` : fullName;
    const initials = getInitials(fullName);
    
    const handleLogout = () => {
        logout();
        removeAuthToken();
        removeUserInfoData();
        router.push('/(auth)/login');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <View className='flex flex-row bg-white justify-between items-center place-items-center px-4 pt-6 border-b border-slate-100'>
            <View className='flex flex-row items-center place-items-center'>
                <Avatar.Text size={24} label={initials} color='white' style={{ backgroundColor: "#cccccc" }} />
                <View className='ml-2'>
                    <Text className='text-slate-400 text-[12px] font-semibold'>Welcome back,</Text>
                    <Text className='text-slate-800 text-base font-medium -mt-2'>{displayName}</Text>
                </View>
            </View>
            <Animated.View className='flex fixed flex-row justify-center items-center'>
                <Image source={require('@/assets/images/icon.png')} className="w-12 h-12 rounded-md" />
                <Text className='text-sm font-bold text-primary'>Supa<Text className='text-black'>Menu</Text></Text>
            </Animated.View>
            <View className='relative flex flex-row justify-center place-items-center items-center'>
                <View className='h-12 w-12 flex justify-center flex-col items-center bg-transparent'>
                    <TouchableHighlight underlayColor={'#d3d3d3'} onPress={() => router.push('/(home)/(tabs)/cart')}>
                        <FontAwesome name="shopping-cart" size={24} color="#94a3b8" />
                    </TouchableHighlight>
                    <Text className="text-slate-400 text-xs absolute top-1 right-1 font-bold">
                        {cart.length > 0 ? cart.length : 0}
                    </Text>
                </View>
                <TouchableHighlight underlayColor={'#d3d3d3'} onPress={toggleDropdown} className='ml-2'>
                    <Ionicons name="menu-sharp" size={24} color="#94a3b8" />
                </TouchableHighlight>
                {dropdownVisible && (
                    <View className="absolute right-0 top-6 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg">
                        <TouchableOpacity
                            className="flex flex-row items-center p-2"
                            onPress={() => { /* navigate to settings */ }}
                        >
                            <MaterialIcons name="settings" size={20} color="#64748b" />
                            <Text className="ml-2 text-slate-500 font-semibold">Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex flex-row items-center p-2"
                            onPress={handleLogout}
                        >
                            <MaterialIcons name="logout" size={20} color="#64748b" />
                            <Text className="ml-2 text-slate-500 font-semibold">Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default HomeTabHeader;
