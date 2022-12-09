export type WithdrawRequestType = {
  id: string;
  bankName: string;
  accountName: string;
  bankAccount: string;
  description: string;
  amount: number;
  status: string;
  refusalReason: string;
  reportMessage: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
};
