export interface Investments {
  numOfInvestment: number;
  listOfInvestment: ListOfInvestment[];
  filterCount: FilterCount;
}

export interface FilterCount {
  waiting: number;
  success: number;
  failed: number;
  canceled: number;
}

export interface ListOfInvestment {
  id: string;
  investorName: string;
  investorImage: string;
  investorEmail: string;
  packageName: string;
  packagePrice: number;
  projectName: string;
  investorId: string;
  totalPrice: number;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  projectId: string;
  packageId: string;
  quantity: number;
}
