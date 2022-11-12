import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { Areas } from '../../../@types/krowd/areaKrowd';
import axios from 'axios';
import { OtherKrowdAPI } from '_apis_/krowd_apis/other';

// ----------------------------------------------------------------------

type AreasState = {
  isLoading: boolean;
  error: boolean;
  areaList: Areas[];
};

const initialState: AreasState = {
  isLoading: false,
  error: false,
  areaList: []
};

const slice = createSlice({
  name: 'area',
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
    getAreaListSuccess(state, action) {
      state.isLoading = false;
      state.areaList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getAreasList(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await OtherKrowdAPI.getArea({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getAreaListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
