import { IProduct } from "@/types";
import { create } from "zustand";
import { EXPO_PUBLIC_API_URL } from "@/utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ProductState {
    products: IProduct[];
    message: string;
    addProduct: (product: IProduct) => Promise<void>;
    removeProduct: (product: IProduct) => Promise<void>;
    updateProduct: (product: IProduct) => Promise<void>;
    fetchProducts: () => Promise<void>;
}


export const useProductStore = create<ProductState>(
    set => ({
        products: [],
        fetchProducts: async () => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${EXPO_PUBLIC_API_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    'Authorization': `Bearer ${token}`,
                    
                }
            })
            const data = await response.json()
            // console.log(data)
            set({ products: data.body, message: data.message })
        },
        addProduct: async (product: IProduct) => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${EXPO_PUBLIC_API_URL}/products`, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data.body)
            set({ products: data.body, message: data.message })
        },
        removeProduct: async (product: IProduct) => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${EXPO_PUBLIC_API_URL}/products/${product?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            set({ message: data.message })
        },
        updateProduct: async (product: IProduct) => {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${EXPO_PUBLIC_API_URL}/products/${product._id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            set({ message: data.message })
        },
        message: ''
    })
)