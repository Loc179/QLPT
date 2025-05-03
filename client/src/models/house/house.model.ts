export class HouseModel {
    public name: string = '';
    public id!: number;
    public address: string = '';
    public description?: string;
    public totalRooms!: number;
    public status!: number;
    public createdAt!: Date;
    public userId!: number;
}