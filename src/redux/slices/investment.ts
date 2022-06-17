import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import { BusinessManager } from '../../@types/krowd/business';
import axios from 'axios';

// ----------------------------------------------------------------------

type BusinessState = {
  isLoading: boolean;
  error: boolean;
  businessList: BusinessManager[];
};

const initialState: BusinessState = {
  isLoading: false,
  error: false,
  businessList: []
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
      console.log('BusinessListAll', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
