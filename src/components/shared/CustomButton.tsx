import {  TouchableOpacity } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import { Text } from '@/components/shared/Themed';
const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
  }: {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading: boolean;
  }) => {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary rounded-lg min-h-[52px] shadow-sm shadow-[#00000081]  flex flex-row justify-center items-center ${containerStyles} ${
          isLoading ? "opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        <Text className={`text-white font-PoppinsSemiBold text-sm ${textStyles}`}>
          {title}
        </Text>
  
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="ml-2"
          />
        )}
      </TouchableOpacity>
    );
  };
  
  export default CustomButton;