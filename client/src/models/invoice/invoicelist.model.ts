export interface InvoiceListModel {
  id: number;
  invoiceCode: string;
  total: number;
  taxRate: number;
  taxAmount: number;
  createdAt: Date;
  isPaid: boolean;
  paymentDate?: Date | null;
  roomId: number;
  roomNumber: number;
  houseId: number;
  houseName: string;
  tenantId: number;
  tenantName: string;
  tenantPhoneNumber: string;
}
