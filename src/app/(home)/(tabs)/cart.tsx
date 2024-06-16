import React, { useEffect } from 'react';
import { ScrollView, Image, Pressable } from 'react-native';
import { Text, View } from '@/components/shared/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCartStore } from '@/components/hooks/store/useCartStore';
import AnimationSection from '@/components/shared/AnimationSection';
import { router } from 'expo-router';

const CartScreen = () => {
  const { cart, loadCart, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, []);

  const updateTotalPrice = () => {
    return cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  return (
    <ScrollView className='bg-white flex flex-1 flex-col px-8'>
      {cart.length === 0 ? (
        <AnimationSection title='Your cart is empty !' animation={require('@/assets/animations/food-cart.json')} />) :
        <View>
          <Text className='text-slate-500 mt-4'>Please Continue to the checkout !</Text>
          <View>
            {cart.map((item) => (
              <View key={item._id} className='flex flex-row justify-start items-center border-b border-gray-200 py-4'>
                <Image className='h-12 w-12 border border-primary rounded-md' source={{ uri: item.thumbnail }} />
                <View className='ml-4 w-60'>
                  <Text className='font-semibold'>{item.name}</Text>
                  <Text className='text-gray-400 text-justify pr-4'>{item.description.slice(0, 70)}</Text>
                  <View className='flex flex-row justify-start py-2 items-center'>
                    <Text className='font-semibold text-primary'>${item.price}</Text>
                  </View>
                </View>
                <View className='flex flex-col justify-center place-items-center items-center'>
                  <Pressable
                    onPress={() => updateQuantity(item._id, item.quantity - 1)}
                    className={`border border-gray-300 h-8 w-8 flex items-center justify-center rounded-full ${item.quantity === 0 ? 'opacity-50' : 'opacity-100'}`}
                    disabled={item.quantity === 0}
                  >
                    <FontAwesome name='minus' size={12} color='#000' />
                  </Pressable>
                  <Text className='py-2'>{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(item._id, item.quantity + 1)}
                    className='border border-gray-300 h-8 w-8 flex items-center justify-center rounded-full'
                  >
                    <FontAwesome name='plus' size={12} color='#000' />
                  </Pressable>
                  <Pressable
                    onPress={() => removeFromCart(item._id)}
                    className='border border-gray-300 h-8 w-8 flex items-center justify-center rounded-full mt-2'
                  >
                    <FontAwesome name='trash' size={12} color='#000' />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
          <View className='flex flex-row justify-between items-center my-6'>
            <Text className='text-sm font-semibold'>T.P : ${updateTotalPrice()}</Text>
            <Pressable
              onPress={() => router.push('/(home)/checkout')}
              disabled={updateTotalPrice() === 0}
              className={`bg-primary py-4 px-8 shadow-lg items-center rounded-md ${updateTotalPrice() === 0 ? 'opacity-50' : 'opacity-100'}`}
            >
              <Text className='text-white font-bold'>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </View>
      }
    </ScrollView>
  );
};

export default CartScreen;
