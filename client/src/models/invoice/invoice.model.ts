export class InvoiceModel {
    id!: number;
    total!: number;
    taxRate!: number;
    taxAmount!: number;
    createdAt!: Date;
    roomId!: number;
}