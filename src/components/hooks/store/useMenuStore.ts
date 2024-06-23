import { IMenu } from "@/types";
import { EXPO_PUBLIC_API_URL, http } from "@/utils/config";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";
import { fetcher } from "@/utils/utilities";
import axios from "axios";

interface MenuState {
    menus: IMenu[];
    message: string;
    addMenu: (menu: IMenu) => Promise<void>;
    removeMenu: (menu: IMenu) => Promise<void>;
    updateMenu: (menu: IMenu) => Promise<void>;
}

export const useMenu = () => {
    const { data, error } = useSWR<IMenu[], Error>('/menus',
        fetcher<IMenu[]>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    return {
        menus: data || [],
        isLoading: !error && !data,
        isError: !!error,
    };
};

export const useMenuStore = create<MenuState>(
    set => ({
        menus: [],
        addMenu: async (menu: IMenu) => {
            const response = await http.post('/menus', menu);
            const data = response.data;
            set((state) => ({ menus: [...state.menus, data.body], message: data.message }));
        },
        removeMenu: async (menu: IMenu) => {
            const response = await http.delete(`/menus/${menu._id}`);
            const data = response.data;
            set((state) => ({ menus: state.menus.filter(r => r._id !== menu._id), message: data.message }));
        },
        updateMenu: async (menu: IMenu) => {
            const response = await http.put(`/menus/${menu._id}`, menu);
            const data = response.data;
            set((state) => {
                return {
                    menus: state.menus.map(r => r._id === menu._id ? data.body : r),
                    message: data.message
                }
            });
        },
        message: ''
    })
)