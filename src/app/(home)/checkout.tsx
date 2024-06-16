import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

const CheckoutScreen = () => {
  return (
    <View className='flex flex-1 bg-white'>
      <View className='flex bg-white shadow-md shadow-green-100 flex-row justify-between items-center px-8 py-16 rounded-b-3xl'>
        <Text className='font-semibold text-xl'>Checkout</Text>
        <View className='flex flex-col items-end justify-end'>
          <Text className='text-green-500 font-bold text-lg'>Frw 16,750</Text>
          <Text className='text-slate-500 text-[12px]'>Including VAT (18%)</Text>
        </View>
      </View>
      <View className='px-8'>
        <View className='flex flex-row -mt-10 items-center justify-center'>
          <Pressable className='bg-white py-6 px-10 rounded-md shadow-md shadow-gray-200'>
            <Text className='font-bold'>Credit Card</Text>
          </Pressable>
          <Pressable className='bg-green-400 py-6 px-6 rounded-md shadow-md shadow-gray-200'>
            <Text className='text-white font-bold'>Mobile & Cash</Text>
          </Pressable>
        </View>
        <View className='py-10 flex-col gap-y-4'>
          <Pressable className='bg-transparent border border-zinc-300 bg-slate-50 rounded-lg flex flex-row items-center'>
            <Image source={require('@/assets/images/mtn-pay.png')} className='w-20 h-20' />
            <Text className='text-black font-medium text-center flex-1'>
              MTN Mobile Money
            </Text>
          </Pressable>
          <Pressable className='bg-transparent rounded-lg flex flex-row items-center'>
            <Image source={require('@/assets/images/airtel-pay.png')} className='w-20 h-20' />
            <Text className='text-black font-medium text-center flex-1'>
              Airtel Pay
            </Text>
          </Pressable>
          <Pressable className='bg-transparent bg-slate-50 rounded-lg flex flex-row items-center'>
            <Image source={require('@/assets/images/cash-pay.png')} className='w-20 h-20' />
            <Text className='text-black font-medium text-center flex-1'>
              Cash Pay
            </Text>
          </Pressable>
        </View>
        <Text className='text-gray-400 text-center'>
          We will send you an order detail to your email for confirmation
        </Text>
        <Pressable onPress={() => router.push('/(home)/success-payment')} className='bg-green-500 py-5 mt-6 rounded-lg px-4 flex flex-row items-center'>
          <FontAwesome name='lock' size={16} color='#fff' />
          <Text className='text-white font-medium text-center flex-1'>
            Pay for the order
          </Text>
        </Pressable>
      </View>


    </View>
  )
}

export default CheckoutScreen