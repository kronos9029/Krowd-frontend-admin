import { Field } from './fields';

export enum ROLE_USER_TYPE {
  BUSINESS_MANAGER = 'BUSINESS_MANAGER',
  INVESTOR = 'INVESTOR',
  PROJECT_MANAGER = 'PROJECT_MANAGER'
}
export enum BUSINESS_STATUS_ENUM {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
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
  status: BUSINESS_STATUS_ENUM;
};

export type UserKrowd = {
  id: string;
  business: Business;
  role: Role;
  description: string;
  phoneNum: string;
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
  image: string;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  lastName: string;
  firstName: string;
};

// export type Business = {
//   id: string;
//   manager: null;
//   fieldList: null;
//   image: string;
//   numOfProject: number;
//   numOfSuccessfulProject: number;
//   successfulRate: number;
//   status: string;
//   createDate: string;
//   createBy: string;
//   updateDate: string;
//   updateBy: string;
//   isDeleted: boolean;
//   name: string;
//   phoneNum: string;
//   email: string;
//   description: string;
//   taxIdentificationNumber: string;
//   address: string;
// };

export type Role = {
  id: string;
  name: ROLE_USER_TYPE;
  description: string;
  createDate: string;
  createBy: null;
  updateDate: string;
  updateBy: null;
  isDeleted: boolean;
};
export type WalletTransaction = {
  id: string;
  userId: string;
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
  createDate: Date | string;
  createBy: string;
  updateDate: Date | string;
  updateBy: string;
  isDeleted: boolean;
};
