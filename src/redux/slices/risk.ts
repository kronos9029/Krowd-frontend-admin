import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from 'axios';
import { RiskTypes } from '../../@types/riskTypeKrowd';

// ----------------------------------------------------------------------

type RiskTypeState = {
  isLoading: boolean;
  error: boolean;
  riskTpyeList: RiskTypes[];
};

const initialState: RiskTypeState = {
  isLoading: false,
  error: false,
  riskTpyeList: []
};

const slice = createSlice({
  name: 'riskType',
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
    getRiskTypeListSuccess(state, action) {
      state.isLoading = false;
      state.riskTpyeList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getRiskTypeList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/riskTypes'
      );
      dispatch(slice.actions.getRiskTypeListSuccess(response.data));
      console.log('riskType: ', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
