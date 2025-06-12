export interface AdvertisementResponseModel {
    id: number;
    title: string;
    description: string;
    address: string;
    cost: number;
    area: number;
    latitude: number;
    longitude: number;
    userId: number;
    username?: string;
    fullname?: string;
    email?: string;
    phonenumber?: string;
    type: number;
    status: number;
    maxOccupants: number;
    createdAt?: Date;
    imagesPath?: string[];
}