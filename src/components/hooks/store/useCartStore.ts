import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface CartItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    loadCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],

    addToCart: async (product) => {
        set((state) => {
            const existingProduct = state.cart.find(item => item._id === product._id);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.cart.push(product);
            }
            SecureStore.setItemAsync('cart', JSON.stringify(state.cart));
            return { cart: state.cart };
    });
    },

    removeFromCart: async (productId) => {
        set((state) => {
            const updatedCart = state.cart.filter(item => item._id !== productId);
            SecureStore.setItemAsync('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    },

    updateQuantity: async (productId, quantity) => {
        set((state) => {
            const updatedCart = state.cart.map(item => item._id === productId ? { ...item, quantity } : item);
            SecureStore.setItemAsync('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    },

    loadCart: async () => {
        const cart = await SecureStore.getItemAsync('cart');
        if (cart) {
            set({ cart: JSON.parse(cart) });
        }
    },
}));
