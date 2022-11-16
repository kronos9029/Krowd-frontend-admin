import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { All_Project_Admin, Chart, Package, Project } from '../../../@types/krowd/project';
import { ProjectAPI } from '_apis_/krowd_apis/project';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectLists: {
    numOfProject: number;
    listOfProject: Project[];
  };
  listCallingProject: {
    isLoading: boolean;
    numOfProject: number;
    listOfProject: All_Project_Admin[];
  };
  projectDetail: { isLoadingDetailsProject: boolean; DetailsProject: Project | null };
  projects: Project[];
  project: Project | null;
  sortBy: Project | null;
  filters: {
    areaId: string;
    status: string[];
  };
  packageLists: {
    numOfPackage: number;
    listOfPackage: Package[];
  };
  listOfChartStage: Chart[];
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  projectDetail: { isLoadingDetailsProject: false, DetailsProject: null },
  projectLists: { numOfProject: 0, listOfProject: [] },
  listCallingProject: { isLoading: false, numOfProject: 0, listOfProject: [] },
  projects: [],
  project: null,
  sortBy: null,
  filters: {
    areaId: 'HCM',
    status: []
  },
  packageLists: {
    numOfPackage: 0,
    listOfPackage: []
  },
  listOfChartStage: []
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE PROJECT
    getProjectListSuccess(state, action) {
      state.isLoading = false;
      state.projectLists = action.payload;
    },
    // GET PROJECT IS CALLING IN DASHBOARD
    startLoadingProjectIsCalling(state) {
      state.listCallingProject.isLoading = true;
    },
    getProjectListCallingProjectSuccess(state, action) {
      state.listCallingProject.isLoading = false;
      state.listCallingProject = action.payload;
    },
    //GET DETAIL OF PROJECT BY ID
    startLoadingGetProjectDetail(state) {
      state.projectDetail.isLoadingDetailsProject = true;
    },
    getProjectListIDSuccess(state, action) {
      state.projectDetail.isLoadingDetailsProject = false;
      state.projectDetail.DetailsProject = action.payload;
    },

    deleteProjectListIDSuccess(state, action) {
      state.projectLists = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.areaId = action.payload.areaId;
      state.filters.status = action.payload.status;
    },
    getProjectPackageSuccess(state, action) {
      state.isLoading = false;
      state.packageLists = action.payload;
    },
    // GET Chart LIST
    getProjectStageListSuccess(state, action) {
      state.isLoading = false;
      state.listOfChartStage = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByProducts, filterProducts } = slice.actions;
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getAllProject(status: string, pageIndex: number, pageSize: number, name: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.getAll({
        status: status,
        pageIndex: pageIndex,
        pageSize: pageSize,
        name: name
      });
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAllCallingProject(
  status: string,
  pageIndex: number,
  pageSize: number,
  name: string
) {
  return async () => {
    dispatch(slice.actions.startLoadingProjectIsCalling());
    try {
      const response = await ProjectAPI.getAll({
        status: status,
        pageIndex: pageIndex,
        pageSize: pageSize,
        name: name
      });
      dispatch(slice.actions.getProjectListCallingProjectSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProjectPackage(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.getProjectPackage({ id: projectId });
      dispatch(slice.actions.getProjectPackageSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectListById(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoadingGetProjectDetail());
    try {
      const response = await ProjectAPI.getProjectByID({ id: projectId });
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectId(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.get({ id: projectId });
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function approveProject(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.approveProject({
        id: projectId
      });
      dispatch(getProjectId(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function activateProject(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.activateProject({
        id: projectId
      });
      dispatch(getProjectId(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function refjectProject(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.rejectProject({
        id: projectId
      });
      dispatch(getProjectId(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProjectStageList(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ProjectAPI.getChartList({ id: projectId });
      dispatch(slice.actions.getProjectStageListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteProjectListById(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${projectId}`
      );
      // dispatch(getProjectList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
