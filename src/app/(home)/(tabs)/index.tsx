import { Text, View } from "@/components/shared/Themed";
import { FlatList, Image, ImageBackground, Pressable, ScrollView } from "react-native";
import React from "react";
import { router } from 'expo-router';
import SingleProduct from "@/components/home-section-dishes/product-dish";
import SemiHeading from "@/components/section-heading/semi-heading";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const restoAdImage = require("@/assets/images/resto-ad.png");
const product1 = require("@/assets/images/products/product1.png");
const product2 = require("@/assets/images/products/product2.png");
const product3 = require("@/assets/images/products/product3.png");
const restaurant1 = require("@/assets/images/restaurants/restaurant1.png");
const restaurant2 = require("@/assets/images/restaurants/restaurant2.jpeg");

const products = [
  { image: product1, name: 'Chicken Masala', description: 'With extra salad', price: '$12.99' },
  { image: product2, name: 'Beef Curry', description: 'Spicy and flavorful', price: '$15.99' },
  { image: product3, name: 'Lamb Kebab', description: 'Tender and juicy', price: '$20.99' }
];

export default function HomeScreen() {
  return (
    <ScrollView className='bg-white px-4 py-4 flex flex-1'>
      <ImageBackground
        source={restoAdImage}
        className="rounded-md flex-col relative px-4 py-4 overflow-hidden bg-cover bg-center h-32"
      >
        <Text className="text-white opacity-90 font-medium">
          Best burgers in town,
        </Text>
        <Text className="text-lg text-white font-PoppinsBold">
          Special Offer
        </Text>
        <Pressable
          className="mt-3 rounded-3xl bg-white/30 w-24 py-2 "
          onPress={() => router.push("/cart")}
        >
          <Text className="text-white text-center text-[12px] font-PoppinsBold">
            Order Now
          </Text>
        </Pressable>
      </ImageBackground>
      <View>
        <SemiHeading title="Popular Dishes" showAll={false} />
        <FlatList
          data={products}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={({ item }: {
            item: {
              image: any,
              name: string,
              description: string,
              price: string
            }
          }) => (
            <SingleProduct
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16}}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      </View>
      <View>
        <SemiHeading title="Recent Restaurants" showAll={true} headerLink="/restaurants" />
        <View className="bg-white rounded-md p-4 border border-slate-200">
          <View className="flex flexjustify-center items-center">
            <Image className="rounded-md w-full h-32 bg-cover" source={restaurant1} />
            <View className="pt-4 w-full">
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="text- font-bold">Atelier du Vin</Text>
                  <Text className="text-gray-400">French Cuisine</Text>
                </View>
                <View className="flex flex-row">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <FontAwesome key={index} name="star" size={18} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit</Text>
            </View>
            <View className="flex flex-row justify-between w-full">
              <Text className="text-slate-400"><FontAwesome name="location-arrow" /> 1.2 Km from your location</Text>
              <Text className="text-slate-400">Crowded</Text>
            </View>
          </View>
        </View>
        <View className="bg-white rounded-md mt-4 p-4 border border-slate-200">
          <View className="flex flexjustify-center items-center">
            <Image className="rounded-md w-full h-32 bg-cover" source={restaurant2} />
            <View className="pt-4 w-full">
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="text- font-bold">La Creola</Text>
                  <Text className="text-gray-400">Kigali Cuisine</Text>
                </View>
                <View className="flex flex-row">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <FontAwesome key={index} name="star" size={18} color="#FFD700" />
                  ))}
                </View>
              </View>
              <Text className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit</Text>
            </View>
            <View className="flex flex-row justify-between w-full">
              <Text className="text-slate-400"><FontAwesome name="location-arrow" /> 1.2 Km from your location</Text>
              <Text className="text-slate-400">Moderate</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
