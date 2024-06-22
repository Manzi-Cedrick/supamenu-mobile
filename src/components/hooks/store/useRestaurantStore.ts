import { IRestaurant } from "@/types";
import { EXPO_PUBLIC_API_URL } from "@/utils/config";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RestaurantState {
    restaurants: IRestaurant[];
    message: string;
    addRestaurant: (restaurant: IRestaurant) => Promise<void>;
    removeRestaurant: (restaurant: IRestaurant) => Promise<void>;
    updateRestaurant: (restaurant: IRestaurant) => Promise<void>;
    fetchRestaurants: () => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>(
    (set) => ({
        restaurants: [],
        fetchRestaurants: async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('New token:', token);
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log('Fetched Data:', data);
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            }
        },
        addRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants`, {
                    method: 'POST',
                    body: JSON.stringify(restaurant),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log('Added Restaurant Data:', data.body);
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to add restaurant:', error);
            }
        },
        removeRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants/${restaurant?._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log('Removed Restaurant Data:', data);
                set({ message: data.message });
            } catch (error) {
                console.error('Failed to remove restaurant:', error);
            }
        },
        updateRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants/${restaurant._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(restaurant),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log('Updated Restaurant Data:', data.body);
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to update restaurant:', error);
            }
        },
        message: ''
    })
);
