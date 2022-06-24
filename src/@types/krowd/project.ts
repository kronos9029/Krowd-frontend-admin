import { FormikProps } from 'formik';

export type ProjectStatus =
  | 'Chưa duyệt'
  | 'Từ chối'
  | 'Đang kêu gọi đầu tư'
  | 'Đang hoạt động'
  | 'Hết thời gian kêu gọi'
  | 'Đóng dự án'
  | '';
export type FormikPropsShopView = FormikProps<ProjectFilter>;

export type Project = {
  id: string;
  managerId: string;
  businessId: string;
  fieldId: string;
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
  status: ProjectStatus;
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
