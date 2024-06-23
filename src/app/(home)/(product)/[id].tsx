import { Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import NestedNavigationHeader from '@/components/section-heading/navigate-header';
import { router, usePathname } from 'expo-router';
import { useProduct, useProductStore } from '@/components/hooks/store/useProductStore';
import { useMenu, useMenuStore } from '@/components/hooks/store/useMenuStore';
import { Text, View } from '@/components/shared/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { IProduct } from '@/types';
import { useCartStore } from '@/components/hooks/store/useCartStore';

const ProductIndex = () => {
    const data = usePathname();
    const { products } = useProduct();
    const { menus } = useMenu();
    const { addToCart } = useCartStore();

    console.log('The prod:', products);
    const menu = menus.find((item) => item._id === decodeURI(data.slice(1)));
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemsAdded, setItemsAdded] = useState(false);

    useEffect(() => {
        if (products.length > 0 && menu) {
            const filteredProducts = products.filter((item) => item.menuId === menu._id).map((product) => ({
                ...product,
                quantity: 0
            }));
            setProductList(filteredProducts);
        }
    }, []);

    const updateTotalPrice = () => {
        const total = productList.reduce((sum, product) => sum + (product.price * (product.quantity || 0)), 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = (index: number, change: number) => {
        setProductList((prevProductList) => {
            const updatedProducts = [...prevProductList];
            const product = updatedProducts[index];
            if (product.quantity !== undefined) {
                product.quantity = Math.max(0, product.quantity + change);
            }
            updateTotalPrice();
            return updatedProducts;
        });
    };

    const handleAddToCart = () => {
        productList.forEach(product => {
            if (product.quantity > 0) {
                addToCart(product);
            }
        });
        console.log('Products added to cart');
        setItemsAdded(true);
    };

    const handleProceedToCheckout = () => {
        router.push('/(home)/(tabs)/cart')
    };
    const product1 = require("@/assets/images/products/product1.png");
    return (
        <SafeAreaView className='bg-white flex flex-1 flex-col px-8 py-4'>
            <ScrollView>
                <View>
                    <Text className='text-xl font-bold ='>{menu?.name}</Text>
                    <Text className='text-gray-400 pt-2'>{menu?.description}</Text>
                </View>
                <View>
                    <Text className='text-lg font-semibold text-black mt-4'>Products</Text>
                    <View>
                        {productList.map((item, index) => {
                            console.log('Product: ', item.thumbnail);
                            return (
                                <View key={index} className='flex flex-row justify-start items-center border-b border-gray-200 py-4'>
                                    <View className='flex flex-col'>
                                        <Image className='h-12 w-12 border border-primary rounded-md' source={product1} />
                                        <View className='ml-4 w-60'>
                                            <Text className='font-semibold pb-1'>{item.name}</Text>
                                            <Text className='text-gray-400 text-justify pr-4'>{item.description.slice(0, 50)}</Text>
                                            <View className='flex flex-row justify-start py-2 items-center'>
                                                <Text className='font-semibold text-primary'>${item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className='flex flex-col justify-center place-items-center items-center'>
                                        <Pressable onPress={() => handleQuantityChange(index, -1)}
                                            className={`border border-gray-300 h-8 w-8 flex items-center justify-center rounded-full ${item.quantity === 0 ? 'opacity-50 bg-zinc-100' : 'opacity-100'}`}
                                            disabled={item.quantity === 0}

                                        >
                                            <FontAwesome name='minus' size={12} color='#000' />
                                        </Pressable>
                                        <Text className='py-2'>{item.quantity}</Text>
                                        <Pressable onPress={() => handleQuantityChange(index, 1)} className='border border-gray-300 h-8 w-8 flex items-center justify-center rounded-full'>
                                            <FontAwesome name='plus' size={12} color='#000' />
                                        </Pressable>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
                {itemsAdded ? (
                    <Pressable
                        onPress={handleProceedToCheckout}
                        className='bg-primary py-4 px-8 shadow-lg items-center rounded-md mt-4'
                    >
                        <Text className='text-white font-bold'>Proceed to Checkout</Text>
                    </Pressable>
                ) : (<View className='flex flex-row justify-between items-center my-6'>
                    <Text className='text-sm font-semibold'>Total Price: ${totalPrice}</Text>
                    <Pressable
                        onPress={handleAddToCart}
                        disabled={totalPrice === 0}
                        className={`bg-primary py-4 px-8 shadow-lg items-center rounded-md ${totalPrice === 0 ? 'opacity-50' : 'opacity-100'}`}
                    >
                        <Text className='text-white font-bold'>Add to Cart ${totalPrice}</Text>
                    </Pressable>
                </View>)}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductIndex