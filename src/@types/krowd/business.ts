export type BusinessManager = {
  id: string;
  name: string;
  phoneNum: string;
  image: string;
  email: string;
  description: string;
  taxIdentificationNumber: string;
  address: string;
  numOfProject: number;
  numOfSuccessfulProject: number;
  successfulRate: number;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  status?: 'Bị khóa' | 'Đang hoạt động' | 'Dừng hoạt động';
};

export type BusinessFilter = {
  status: string[];
};
