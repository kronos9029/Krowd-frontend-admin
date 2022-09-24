import { FormikProps } from 'formik';

export const ProjectStatus = [
  { name: 'Chưa duyệt', color: 'orange' },
  { name: 'Từ chối', color: 'red' },
  { name: 'Đang kêu gọi đầu tư', color: 'blue' },
  { name: 'Hết thời gian kêu gọi', color: 'browd' },
  { name: 'Đang hoạt động', color: 'green' },
  { name: 'Đóng dự án', color: 'black' }
];
export type FormikPropsShopView = FormikProps<ProjectFilter>;

export enum PROJECT_STATUS {
  ACTIVE = 'ACTIVE',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
  CALLING_FOR_INVESTMENT = 'CALLING_FOR_INVESTMENT',
  DENIED = 'DENIED',
  DRAFT = 'DRAFT',
  OVERDATE = 'OVERDATE'
}
export type Project = {
  id: string;
  image: string;
  business: {
    id: string;
    manager: {
      id: string;
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
      status: number;
      createDate: string;
      createBy: any;
      updateDate: string;
      updateBy: any;
      isDeleted: boolean;
      lastName: string;
      firstName: string;
    };
    fieldList: {
      id: string;
      name: string;
      description: string;
      createDate: string;
      createBy: string;
      updateDate: string;
      updateBy: string;
      isDeleted: boolean;
    }[];
    image: string;
    numOfProject: number;
    numOfSuccessfulProject: number;
    successfulRate: number;
    status: number;
    createDate: string;
    createBy: string;
    updateDate: string;
    updateBy: string;
    isDeleted: boolean;
    name: string;
    phoneNum: string;
    email: string;
    description: string;
    taxIdentificationNumber: string;
    address: string;
  };
  manager: {
    id: string;
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
    status: number;
    createDate: string;
    createBy: any;
    updateDate: string;
    updateBy: any;
    isDeleted: boolean;
    lastName: string;
    firstName: string;
  };
  field: {
    id: string;
    name: string;
    description: string;
    createDate: string;
    createBy: string;
    updateDate: string;
    updateBy: string;
    isDeleted: boolean;
  };
  area: {
    id: string;
    city: string;
    district: string;
    createDate: string;
    createBy: any;
    updateDate: string;
    updateBy: any;
    isDeleted: boolean;
  };
  projectEntity: {
    type: string;
    typeItemList: {
      id: string;
      title: string;
      link: string;
      content: string;
      description: string;
      priority: number;
    }[];
  }[];
  memberList: any[];
  remainAmount: number;
  approvedDate: string;
  approvedBy: string;
  status: PROJECT_STATUS;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  name: string;
  description: string;
  address: string;
  investmentTargetCapital: number;
  investedCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  numOfStage: number;
  startDate: string;
  endDate: string;
  businessLicense: string;
  areaId: string;
};
export type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projects: Project[];
  project: Project | null;
  sortBy: string | null;
  filters: {
    status: string[];
    // businessId: string;
    areaId: string;
    // fieldId: string[];
  };
};

export type ProjectFilter = {
  status: string[];
  // businessId: string;
  areaId: string;
  // fieldId: string[];
};
export type Package = {
  id: string;
  remainingQuantity: number;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  name: string;
  projectId: string;
  price: number;
  image: File | any;
  quantity: number;
  descriptionList: string[];
};
