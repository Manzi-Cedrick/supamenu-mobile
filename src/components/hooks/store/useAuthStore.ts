import { IUser } from "@/types"
import { EXPO_PUBLIC_API_URL } from "@/utils/config";
import { create } from 'zustand';

interface IAuthState {
    login: (email: string, password: string) => Promise<{body: IUser; token: string; message?: string}>;
    logout: () => void
    register: (user: IUser) => Promise<{body: IUser; token: string; message?: string}>
    user: IUser | null
    token: string | null
    setUser: (user: IUser) => void;
    setToken: (token: string) => void;
}

export const useAuthStore = create<IAuthState>(
    (set) => ({
        user: null,
        token: null,
        login: async (email: String, password: String) => {
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.status === 200 && data.body && data.token) {
                    set({ user: data.body, token: data.token });
                    return data;
                } else {
                    // console.error('Login error:', data.message);
                    return data;
                }
            } catch (error) {
                console.error('Unexpected error: ', error);
                throw error;
            }
        },
        logout: () => set({ user: null, token: null }),
        register: async (user: IUser) => {
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/auth/register`, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.status === 201 && data.body) {
                    set({ user: data.body });
                    return data;
                } else {
                    console.error('Registration error:', data);
                    return data;
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                throw error;
            }
        },
        setUser: (user: IUser) => set({ user }),
        setToken: (token: string) => set({ token }),
    })
);
