export type Investments = {
  investorId: string;
  projectId: string;
  packageId: string;
  quantity: number;
  totalPrice: number;
  lastPayment: Date | string | number;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  isDeleted: boolean;
};
