import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { Areas } from '../../../@types/krowd/areaKrowd';
import axios from 'axios';

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

export function getAreasList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/areas'
      );
      dispatch(slice.actions.getAreaListSuccess(response.data));
      console.log('Areas data:', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
