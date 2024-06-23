import React from 'react'
import { Link } from 'expo-router';
import { Text, View } from '../shared/Themed';

type LinkType = "/cart" | "/notifications" | "/restaurants";

interface SemiHeadingProps {
    title: string;
    showAll: boolean;
    headerLink?: LinkType;
    showResults?: boolean;
    results?: number;
}
const SemiHeading = ({ title, showAll, headerLink, showResults, results }: SemiHeadingProps) => {
    return (
        <View className="flex py-4 flex-row items-center justify-between">
            <Text className="font-PoppinsSemiBold text-black/80">{title}</Text>
            {showAll && headerLink ? (
                <Link href={headerLink}>
                    <Text className="text-gray-400 text-[12px] hover:text-blue-500 focus:text-blue-600">View All</Text>
                </Link>) :
                null
            }
            {showResults && results ? (
                <Text className="text-gray-400 text-[12px] hover:text-blue-500 focus:text-blue-600">{results} Results</Text>
            ) : null
            }
        </View>
    )
}

export default SemiHeading