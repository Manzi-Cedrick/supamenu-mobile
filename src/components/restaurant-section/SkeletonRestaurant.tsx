import React from 'react';
import { View } from 'react-native';

const SkeletonLoaderRestaurant = () => {
  return (
    <View className="bg-white border border-zinc-200 shadow-md shadow-[#edededbf] rounded-md my-2 p-4">
      <View className="w-full h-32 bg-gray-300 rounded-md"></View>
      <View className="pt-4 w-full">
        <View className="w-1/2 h-6 bg-gray-300 rounded-md mb-2"></View>
        <View className="w-1/4 h-4 bg-gray-300 rounded-md mb-2"></View>
        <View className="w-full h-4 bg-gray-300 rounded-md mb-2"></View>
        <View className="w-1/3 h-4 bg-gray-300 rounded-md mb-2"></View>
      </View>
      <View className="flex flex-row justify-between w-full">
        <View className="w-1/2 h-4 bg-gray-300 rounded-md"></View>
        <View className="w-1/4 h-4 bg-gray-300 rounded-md"></View>
      </View>
    </View>
  );
};

export default SkeletonLoaderRestaurant;
