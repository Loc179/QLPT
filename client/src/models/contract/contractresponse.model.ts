export class ContractResponseModel {
    id?: number;
    userId!: number;
    tenantId!: number;
    tenantName!: string;
    startDate!: Date;
    endDate!: Date;
    depositAmount!: number;
    status!: number;
    notes?: string;
    createdAt?: Date;
}