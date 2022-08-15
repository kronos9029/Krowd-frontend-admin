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

export type Project = {
  id: string;
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
  business: {
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
  field: {
    id: string;
    name: string;
    description: string;
    createDate: Date;
    createBy: string;
    updateDate: Date;
    updateBy: string;
    isDeleted: boolean;
  };
  fieldName: string;
  areaId: string;
  name: string;
  image: string;
  description: string;
  address: string;
  investmentTargetCapital: number;
  investedCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  numOfStage: number;
  remainAmount: number;
  startDate: string;
  endDate: string;
  businessLicense: string;
  approvedDate: string;
  approvedBy: string;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
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
