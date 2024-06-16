import { View, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const SearchBar = () => {
    return (
        <View className="flex flex-row items-center border border-zinc-300 rounded-lg">
            <FontAwesome name="search" size={16} color={'#ccc'} style={{ paddingLeft: 10 }} />
            <TextInput className="p-3.5" placeholder="Search for restaurants" />
        </View>
    )
}

export default SearchBar