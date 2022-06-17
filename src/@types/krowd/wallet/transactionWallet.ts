export type TransactionWallet = {
  id: string;
  paymentId: string;
  systemWalletId: string;
  projectWalletId: string;
  investorWalletId: string;
  amount: number;
  description: string;
  type: string;
  fromWalletId: string;
  toWalletId: string;
  fee: number;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  isDeleted: boolean;
};
