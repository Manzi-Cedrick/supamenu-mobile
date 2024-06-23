import { IRestaurant } from "@/types";
import { http } from "@/utils/config";
import { create } from "zustand";
import useSWR from 'swr';
import { fetcher } from "@/utils/utilities";

interface RestaurantState {
    restaurants: IRestaurant[];
    message: string;
    addRestaurant: (restaurant: IRestaurant) => Promise<void>;
    removeRestaurant: (restaurant: IRestaurant) => Promise<void>;
    updateRestaurant: (restaurant: IRestaurant) => Promise<void>;
}


export const useRestaurants = () => {
    const { data, error } = useSWR<IRestaurant[], Error>('/restaurants',
        fetcher<IRestaurant[]>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    return {
        restaurants: data || [],
        isLoading: !error && !data,
        isError: !!error,
    };
};

export const useRestaurantStore = create<RestaurantState>((set) => ({
    restaurants: [],
    addRestaurant: async (restaurant: IRestaurant) => {
        try {
            const response = await http.post('/restaurants', restaurant);
            const data = response.data;
            set((state) => ({ restaurants: [...state.restaurants, data.body], message: data.message }));
        } catch (error) {
            console.error('Failed to add restaurant:', error);
            set({ message: 'Failed to add restaurant' });
        }
    },
    removeRestaurant: async (restaurant: IRestaurant) => {
        try {
            const response = await http.delete(`/restaurants/${restaurant._id}`);
            const data = response.data;
            set((state) => ({ restaurants: state.restaurants.filter(r => r._id !== restaurant._id), message: data.message }));
        } catch (error) {
            console.error('Failed to remove restaurant:', error);
            set({ message: 'Failed to remove restaurant' });
        }
    },
    updateRestaurant: async (restaurant: IRestaurant) => {
        try {
            const response = await http.put(`/restaurants/${restaurant._id}`, restaurant);
            const data = response.data;
            set((state) => ({
                restaurants: state.restaurants.map(r => r._id === restaurant._id ? data.body : r),
                message: data.message
            }));
        } catch (error) {
            console.error('Failed to update restaurant:', error);
            set({ message: 'Failed to update restaurant' });
        }
    },
    message: ''
}));