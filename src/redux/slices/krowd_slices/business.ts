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
import { Project } from '../../../@types/krowd/project';

// ----------------------------------------------------------------------

type BusinessState = {
  businessState: {
    isLoading: boolean;
    businessLists: {
      numOfBusiness: number;
      listOfBusiness: Business[];
    };
    error: boolean;
  };
  tempBusinessState: {
    isLoading: boolean;
    tempBusinessList: TempBusiness[];
    error: boolean;
  };
  businessDetailState: {
    isLoading: boolean;
    businessDetail: Business | null;
    projectsOfBusiness: Project[] | null;
    error: boolean;
  };
};

const initialState: BusinessState = {
  businessState: {
    isLoading: false,
    businessLists: {
      numOfBusiness: 0,
      listOfBusiness: []
    },
    error: false
  },
  tempBusinessState: {
    isLoading: false,
    tempBusinessList: [],
    error: false
  },
  businessDetailState: {
    isLoading: false,
    businessDetail: null,
    projectsOfBusiness: null,
    error: false
  }
};

const slice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    //-------------------BUSINESS------------------
    // START LOADING
    startBusinessLoading(state) {
      state.businessState.isLoading = true;
    },

    // GET MANAGE BUSINESS
    getBusinessListSuccess(state, action) {
      state.businessState.isLoading = false;
      state.businessState.businessLists = action.payload;
    },

    // HAS ERROR
    hasBusinessError(state, action) {
      state.businessState.isLoading = false;
      state.businessState.error = action.payload;
    },
    //-------------------TEMP BUSINESS------------------
    // START LOADING
    startTempBusinessLoading(state) {
      state.tempBusinessState.isLoading = true;
    },

    // GET MANAGE TEMP BUSINESS
    getAllTempBusinessSuccess(state, action) {
      state.tempBusinessState.isLoading = false;
      state.tempBusinessState.tempBusinessList = action.payload;
    },

    // HAS ERROR
    hasTempBusinessError(state, action) {
      state.tempBusinessState.isLoading = false;
      state.tempBusinessState.error = action.payload;
    },

    //-------------------DETAIL OF BUSINESS------------------
    // START LOADING
    startBusinessDetailLoading(state) {
      state.businessDetailState.isLoading = true;
    },

    // GET MANAGE BUSINESS DETAIL
    getBusinessDetailSuccess(state, action) {
      state.businessDetailState.isLoading = false;
      state.businessDetailState.businessDetail = action.payload;
    },
    // HAS ERROR
    hasBusinessDetailError(state, action) {
      state.businessDetailState.isLoading = false;
      state.businessDetailState.error = action.payload;
    },
    // GET MANAGE PROJECT OF BUSINESS
    getProjectOfBusiness(state, action) {
      state.businessDetailState.isLoading = false;
      state.businessDetailState.projectsOfBusiness = action.payload;
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
    dispatch(slice.actions.startBusinessLoading());
    try {
      const response = await axios.get(REACT_APP_API_URL + 'businesses', {
        params: { temp_field_role }
      });
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasBusinessError(error));
    }
  };
}

export function getAllTempBusiness() {
  return async () => {
    dispatch(slice.actions.startTempBusinessLoading());
    try {
      const res = await FirebaseService.getAllTempBusiness();
      dispatch(slice.actions.getAllTempBusinessSuccess(res));
    } catch (error) {
      dispatch(slice.actions.hasTempBusinessError(error));
    }
  };
}

export function getBusinessById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startBusinessDetailLoading());
    try {
      const response = await axios.get(REACT_APP_API_URL + `businesses/${bussinessId}`);
      dispatch(slice.actions.getBusinessDetailSuccess(response.data));
    } catch (error) {
      console.log('...');
      dispatch(slice.actions.hasBusinessDetailError(error));
    }
  };
}

export function getProjectByBusinessID(businessId: string, temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startBusinessDetailLoading());
    try {
      const response = await axios.get(REACT_APP_API_URL + 'projects', {
        params: { businessId, temp_field_role }
      });

      dispatch(slice.actions.getProjectOfBusiness(response.data));
    } catch (error) {
      dispatch(slice.actions.hasBusinessDetailError(error));
    }
  };
}

export function deleteBusinessById(bussinessId: string) {
  return async () => {
    dispatch(slice.actions.startBusinessLoading());
    try {
      const response = await axios.delete(REACT_APP_API_URL + `businesses/${bussinessId}`);
      dispatch(getBusinessList('ADMIN'));
    } catch (error) {
      dispatch(slice.actions.hasBusinessError(error));
    }
  };
}
