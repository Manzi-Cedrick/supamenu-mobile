import { http } from "./config";

export const getInitials = (name:string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0];
    } else {
        return nameParts[0][0] + (nameParts[0][1] || '');
    }
};

export const fetcher = async <T>(url: string): Promise<T> => {
    const response = await http.get<{ body: T, message: string }>(`${url}`);
    console.log('fetcher response:', response.data);
    return response.data.body;
};