import { IMenu } from "@/types";
import { EXPO_PUBLIC_API_URL } from "@/utils/config";
import { create } from "zustand";
import * as SecureStorage from 'expo-secure-store';

interface MenuState {
    menus: IMenu[];
    message: string;
    addMenu: (menu: IMenu) => Promise<void>;
    removeMenu: (menu: IMenu) => Promise<void>;
    updateMenu: (menu: IMenu) => Promise<void>;
    fetchMenus: () => Promise<void>;
}

const token = SecureStorage.getItemAsync('token');
export const useMenuStore = create<MenuState>(
    set => ({
        menus: [],
        fetchMenus: async () => {
            // console.log(token)
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/menus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    'Authorization': `Bearer ${token?._j}`,
                    
                }
            })
            const data = await response.json()
            // console.log(data)
            set({ menus: data.body, message: data.message })
        },
        addMenu: async (menu: IMenu) => {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/menus`, {
                method: 'POST',
                body: JSON.stringify(menu),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data.body)
            set({ menus: data.body, message: data.message })
        },
        removeMenu: async (menu: IMenu) => {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/menus/${menu?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            set({ message: data.message })
        },
        updateMenu: async (menu: IMenu) => {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/menus/${menu._id}`, {
                method: 'PUT',
                body: JSON.stringify(menu),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            set({ menus: data.body, message: data.message })
        },
        message: ''
    })
)