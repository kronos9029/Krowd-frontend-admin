import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Project } from '../../../@types/krowd/project';

// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectLists: {
    numberOfproject: number;
    businessId: Project[];
  };
  activeProjectId: Project | null;
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  activeProjectId: null,
  projectLists: { numberOfproject: 0, businessId: [] }
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
      state.activeProjectId = action.payload;
    },
    delProjectListIDSuccess(state, action) {
      state.projectLists = action.payload;
    },
    getProjectByBusinessIDSuccess(state, action) {
      const projectLists = action.payload;
      state.isLoading = false;
      console.log('t di qua day roi');
      state.projectLists.businessId = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getProjectList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses'
      );
      dispatch(slice.actions.getProjectListSuccess(response.data));
      // console.log('aaaaa', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectListById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${bussinessId}`
      );
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectByBusinessID(businessId: string, temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('t vo goi api ne');

      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects',
        {
          params: { businessId, temp_field_role }
        }
      );
      console.log('t tra duoc data ne');
      dispatch(slice.actions.getProjectByBusinessIDSuccess(response.data.projectLists));
    } catch (error) {
      console.log('t dang loi o day', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delProjectListById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${bussinessId}`
      );
      dispatch(getProjectList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
