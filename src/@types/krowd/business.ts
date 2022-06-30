import { Field } from './fields';

export type Business = {
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
  manager: {
    id: string;
    businessId: string;
    roleId: string;
    description: string;
    lastName: string;
    firstName: string;
    phoneNum: string;
    image: string;
    idCard: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    taxIdentificationNumber: string;
    city: string;
    district: string;
    address: string;
    bankName: string;
    bankAccount: string;
    status: number;
    createDate: string;
    createBy: string;
    updateDate: string;
    updateBy: string;
    isDeleted: boolean;
  };
  fieldList: [Field];
  status?: 'Bị khóa' | 'Đang hoạt động' | 'Dừng hoạt động';
};

export type BusinessFilter = {
  status: string[];
};
