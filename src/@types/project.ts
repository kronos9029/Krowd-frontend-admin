export type ProjectStatus =
  | 'Chưa duyệt'
  | 'Từ chối'
  | 'Đang kêu gọi đầu tư'
  | 'Đang hoạt động'
  | 'Hết thời gian kêu gọi'
  | 'Đóng dự án'
  | '';

export type Project = {
  id: string;
  managerId: string;
  businessId: string;
  name: string;
  image: string;
  description: string;
  category: string;
  address: string;
  areaId: string;
  investmentTargetCapital: number;
  investedCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  numOfStage: number;
  remainAmount: number;
  startDate: Date | string | number;
  endDate: Date | string | number;
  businessLicense: string;
  approvedDate: Date | string | number;
  approvedBy: string;
  status: number;
  createDate: Date | string | number;
  createBy: string;
  updateDate: Date | string | number;
  updateBy: string;
  isDeleted: boolean;
};

export type ProductState = {
  isLoading: boolean;
  error: boolean;
  projects: Project[];
  project: Project | null;
  sortBy: string | null;
  filters: {
    status: string[];
    category: string[];
    businessField: string;
    businessId: string;
    areaId: string;
  };
};

export type ProjectFilter = {
  status: string[];
  category: string[];
  businessField: string;
  businessId: string;
  areaId: string;
};
