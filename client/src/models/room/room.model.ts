export class RoomModel {
    id!: number;
    roomNumber!: number;
    description?: string;
    price!: number;
    maxOccupants!: number;
    occupancyStatus!: number;
    createdAt!: Date;
    houseId!: number;
}