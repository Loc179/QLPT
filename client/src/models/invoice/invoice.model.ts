export class InvoiceModel {
    total!: number;
    taxRate!: number;
    createdAt!: Date;
    isPaid!: boolean;
    invoiceCode!: string;
    paymentDate!: Date | null;
    roomId!: number;
}