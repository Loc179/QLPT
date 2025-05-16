export class TenantModel {
    id!: number;
    fullName: string = '';
    phoneNumber: string = '';
    email: string = '';
    isRepresentative!: boolean;
    roomId!: number;
    roomNumber: string = '';
    houseId!: number;
    houseName: string = '';
}