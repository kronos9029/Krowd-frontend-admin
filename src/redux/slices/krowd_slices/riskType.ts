import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { RiskTypes } from '../../../@types/krowd/riskTypeKrowd';

// ----------------------------------------------------------------------

type RiskTypeState = {
  isLoading: boolean;
  error: boolean;
  riskTypeList: RiskTypes[];
  activeRiskTypeId: RiskTypes | null;
};

const initialState: RiskTypeState = {
  isLoading: false,
  error: false,
  activeRiskTypeId: null,
  riskTypeList: []
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
    getRiskTypeListSuccess(state, action) {
      state.isLoading = false;
      state.riskTypeList = action.payload;
    },
    getRiskTypeIDSuccess(state, action) {
      state.isLoading = false;
      state.activeRiskTypeId = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

export function getRiskTypeList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/risk_types'
      );
      dispatch(slice.actions.getRiskTypeListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// get by ID
export function getRiskTypeById(risk_typeId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/risk_types/${risk_typeId}`
      );
      dispatch(slice.actions.getRiskTypeIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//delete
export function delRiskTypeById(risk_typeId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/risk_types/${risk_typeId}`
      );
      dispatch(getRiskTypeList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
