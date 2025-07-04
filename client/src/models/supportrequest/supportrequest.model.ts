export class SupportRequestModel {
    id!: number;
    content: string = '';
    adminReply?: string;
    status?: number;
    createdAt?: Date;
    userId!: number;
    userName?: string;
    userFullName?: string;
}