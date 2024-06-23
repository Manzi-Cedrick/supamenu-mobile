import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import CustomHeader from '@/components/section-heading/CustomHeader';

const RestaurantLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            <CustomHeader title={'Menus'} navigateBack={navigation.goBack} />
            <Slot />
        </>
    );
};

export default RestaurantLayout;