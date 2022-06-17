export type SystemWallet = {
  id: string;
  balance: number;
  walletTypeId: string;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  isDeleted: boolean;
};
