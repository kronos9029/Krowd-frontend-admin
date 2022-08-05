import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { Business, TempBusiness } from '../../../@types/krowd/business';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { REACT_APP_API_URL } from 'config';
import FirebaseService from 'api/firebase';

// ----------------------------------------------------------------------

type BusinessState = {
  isLoading: boolean;
  error: boolean;
  businessLists: {
    numOfBusiness: number;
    listOfBusiness: Business[];
  };
  businessDetail: Business | null;
  tempBusinessList: TempBusiness[];
  status: string[];
};

const initialState: BusinessState = {
  isLoading: false,
  error: false,
  businessDetail: null,
  businessLists: { numOfBusiness: 0, listOfBusiness: [] },
  tempBusinessList: [],
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
      state.businessLists = action.payload;
    },

    getBusinessListIDSuccess(state, action) {
      state.isLoading = false;
      state.businessDetail = action.payload;
    },
    delBusinessListIDSuccess(state, action) {
      state.businessLists = action.payload;
    },

    getAllTempBusiness(state, action) {
      state.tempBusinessList = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getBusinessList(temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(REACT_APP_API_URL + 'businesses', {
        params: { temp_field_role }
      });
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAllTempBusiness() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await FirebaseService.getAllTempBusiness();
      dispatch(slice.actions.getAllTempBusiness(res));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getBusinessListById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(REACT_APP_API_URL + `businesses/${bussinessId}`);
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
      const response = await axios.get(REACT_APP_API_URL + 'projects', {
        params: { businessId, temp_field_role }
      });

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
      const response = await axios.delete(REACT_APP_API_URL + `businesses/${bussinessId}`);
      dispatch(getBusinessList('ADMIN'));
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
      const response = await axios.post(REACT_APP_API_URL + `businesses`);
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      console.log('da tao o dong nay 2');
      dispatch(slice.actions.hasError(error));
    }
  };
}
