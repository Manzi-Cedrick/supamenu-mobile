import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import CustomHeader from '@/components/section-heading/CustomHeader';

const ProductLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            <CustomHeader title={'Products'} navigateBack={navigation.goBack} />
            <Slot />
        </>
    );
};

export default ProductLayout;