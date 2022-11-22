export type AccountTransaction = {
  id: string;
  fromUserId: string;
  partnerClientId: string;
  amount: string;
  orderType: string;
  message: string;
  orderId: string;
  partnerCode: string;
  payType: string;
  signature: string;
  requestId: string;
  responsetime: string;
  resultCode: string;
  extraData: string;
  orderInfo: string;
  transId: string;
  createDate: string;
  type: string;
};

export type WalletTransaction = {
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

export type PeriodRevenueHistory = {
  id: string;
  name: string;
  periodRevenueId: string;
  description: string;
  status: string;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  isDeleted: boolean;
};
// ===================================BILL IN DAILY REPORT================================
export type BillDailyReport = {
  numOfBill: number;
  listOfBill: Bill[];
};

export type Bill = {
  id: string;
  dailyReportId: string;
  invoiceId: string;
  amount: number;
  description: string;
  createBy: string;
  createDate: string;
};
// ===================================DAILY REPORT================================

export type DailyReportProject = {
  numOfDailyReport: number;
  listOfDailyReport: ListOfDailyReport[];
};

export type ListOfDailyReport = {
  id: string;
  stageId: string;
  amount: number;
  reportDate: string;
  createDate: Date | string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  status: string;
};
