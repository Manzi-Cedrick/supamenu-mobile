import { IProduct } from "@/types";
import { create } from "zustand";
import { http } from "@/utils/config";
import useSWR from "swr";
import { fetcher } from "@/utils/utilities";
interface ProductState {
    products: IProduct[];
    message: string;
    addProduct: (product: IProduct) => Promise<void>;
    removeProduct: (product: IProduct) => Promise<void>;
    updateProduct: (product: IProduct) => Promise<void>;
}

export const useProduct = () => {
    const { data, error } = useSWR<IProduct[], Error>('/products',
        fetcher<IProduct[]>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    return {
        products: data || [],
        isLoading: !error && !data,
        isError: !!error,
    };
};


export const useProductStore = create<ProductState>(
    set => ({
        products: [],
        addProduct: async (product: IProduct) => {
            const response = await http.post('/products', product);
            const data = response.data;
            set({ products: data.body, message: data.message })
        },
        removeProduct: async (product: IProduct) => {
            const response = await http.delete(`/products/${product._id}`);
            const data = await response.data;
            set({ message: data.message })
        },
        updateProduct: async (product: IProduct) => {
            const response = await http.put(`/products/${product._id}`, product);
            const data = await response.data;
            set({ message: data.message })
        },
        message: ''
    })
)