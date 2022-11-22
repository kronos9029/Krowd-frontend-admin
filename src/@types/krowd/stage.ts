export type ProjectStageList = {
  numOfStage: number;
  listOfStage: Stage[];
  filterCount: FilterCount;
};

export type FilterCount = {
  inactive: number;
  undue: number;
  due: number;
  done: number;
};
export type Stage = {
  id: string;
  projectId: string;
  status: string;
  createDate: Date | string;
  createBy: string;
  updateDate: Date | string;
  updateBy: string;
  isDeleted: boolean;
  pessimisticExpectedAmount: number;
  normalExpectedAmount: number;
  optimisticExpectedAmount: number;
  pessimisticExpectedRatio: number;
  normalExpectedRatio: number;
  optimisticExpectedRatio: number;
  description: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  actualAmount: string;
  isOverDue: string;
  paidAmount: string;
  sharedAmount: string;
};

export type Chart = {
  chartName: string;
  lineList: LineList[];
};

export type LineList = {
  lineName: string;
  data: number[];
};
