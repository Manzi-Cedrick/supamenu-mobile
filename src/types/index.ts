export type TRestaurentStatus = 'open' | 'full' | 'clowded' | 'quiet' | 'moderate';

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    role: string;
    telephone: string;
}

export interface ILogin extends Partial<IUser> {
    email: string;
    password: string;
}

export interface IRestaurant {
    _id?: string;
    title: string;
    location: string;
    status: TRestaurentStatus;
    thumbnail: any;
    description: string;
    rating: number;
}

export interface IMenu {
    _id: string;
    name: string;
    restaurantId: string;
    description: string;
    icon: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    type: string;
    stockStatus: string;
    price: number;
    menuId: string;
    quantity: number;
    thumbnail: string;
}
