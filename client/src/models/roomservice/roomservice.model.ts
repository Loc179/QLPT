export class RoomServiceModel {
    id!: number;
    name: string = '';
    cost!: number;
    unit!: number; // e.g., per month
    createdAt!: Date;
    roomId!: number;
}