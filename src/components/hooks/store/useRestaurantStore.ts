import { IRestaurant } from "@/types";
import { EXPO_PUBLIC_API_URL } from "@/utils/config";
import { create } from "zustand";
import * as SecureStorage from 'expo-secure-store';

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
                const token = await SecureStorage.getItemAsync('token');
                console.log(token)
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                // const data = await response.json();
                const text = await response.text();
                console.log('Fetch Restaurants Response Text:', text);

                const data = JSON.parse(text);
                console.log(data);
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            }
        },
        addRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await SecureStorage.getItemAsync('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants`, {
                    method: 'POST',
                    body: JSON.stringify(restaurant),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data.body);
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to add restaurant:', error);
            }
        },
        removeRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await SecureStorage.getItemAsync('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants/${restaurant?._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                set({ message: data.message });
            } catch (error) {
                console.error('Failed to remove restaurant:', error);
            }
        },
        updateRestaurant: async (restaurant: IRestaurant) => {
            try {
                const token = await SecureStorage.getItemAsync('token');
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/restaurants/${restaurant._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(restaurant),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                set({ restaurants: data.body, message: data.message });
            } catch (error) {
                console.error('Failed to update restaurant:', error);
            }
        },
        message: ''
    })
);
