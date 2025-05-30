export class ContractModel {
    id?: number;
    userId!: number;
    tenantIds: Array<number> = [];
    tenantNames: Array<string> = [];
    startDate!: Date;
    endDate!: Date;
    depositAmount!: number;
    status!: number;
    notes?: string;
    createdAt?: Date;
}