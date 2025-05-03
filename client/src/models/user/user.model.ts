export class UserModel {
    id!: number;
    userName!: string;
    email!: string;
    phoneNumber?: string;
    fullName?: string;
    createdAt!: Date;
    status!: number;
    servicePackageId!: number;
}