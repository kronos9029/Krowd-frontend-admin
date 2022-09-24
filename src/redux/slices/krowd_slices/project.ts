import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Chart, Package, Project, ProjectStatus } from '../../../@types/krowd/project';
import { REACT_APP_API_URL } from '../../../config';
import { ProjectAPI } from '_apis_/krowd_apis/project';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectLists: {
    numOfProject: number;
    listOfProject: Project[];
  };
  projectDetail: Project | null;
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
  projectDetail: null,
  projectLists: { numOfProject: 0, listOfProject: [] },
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

    // GET MANAGE USERS
    getProjectListSuccess(state, action) {
      state.isLoading = false;
      state.projectLists = action.payload;
    },

    getProjectListIDSuccess(state, action) {
      state.isLoading = false;
      state.projectDetail = action.payload;
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

export function getAllProject() {
  return async () => {
    const { dispatch } = store;

    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { products: Project[] } } = await ProjectAPI.getAll();
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses'
      );

      dispatch(slice.actions.getProjectListSuccess(response.data));
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
    dispatch(slice.actions.startLoading());
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
      dispatch(getProjectList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
