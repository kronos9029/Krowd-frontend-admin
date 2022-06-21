import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { BusinessManager } from '../../../@types/krowd/business';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

// ----------------------------------------------------------------------

type BusinessState = {
  isLoading: boolean;
  error: boolean;
  businessList: BusinessManager[];
  activeBussinessId: BusinessManager | null;
  status: string[];
};

const initialState: BusinessState = {
  isLoading: false,
  error: false,
  activeBussinessId: null,
  businessList: [],
  status: ['Đang hoạt động', 'Ngừng hoạt động', 'Bị khóa']
};

const slice = createSlice({
  name: 'business',
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
    getBusinessListSuccess(state, action) {
      state.isLoading = false;
      state.businessList = action.payload;
    },

    getBusinessListIDSuccess(state, action) {
      state.isLoading = false;
      state.activeBussinessId = action.payload;
    },
    delBusinessListIDSuccess(state, action) {
      state.businessList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getBusinessList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses'
      );
      dispatch(slice.actions.getBusinessListSuccess(response.data));
      // console.log('aaaaa', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getBusinessListById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${bussinessId}`
      );
      dispatch(slice.actions.getBusinessListIDSuccess(response.data));
    } catch (error) {
      console.log('...');
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectByBusinessID(businessId: string, temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects',
        {
          params: { businessId, temp_field_role }
        }
      );
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      console.log('...');
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delBusinessListById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${bussinessId}`
      );
      dispatch(getBusinessList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postBusiness() {
  return async () => {
    dispatch(slice.actions.startLoading());
    console.log('da tao o dong nay');
    try {
      const response = await axios.post(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses`
      );
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      console.log('da tao o dong nay 2');
      dispatch(slice.actions.hasError(error));
    }
  };
}
