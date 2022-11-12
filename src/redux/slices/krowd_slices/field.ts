import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { Field } from '../../../@types/krowd/fields';
import { OtherKrowdAPI } from '_apis_/krowd_apis/other';

// ----------------------------------------------------------------------

export type FieldState = {
  isLoading: boolean;
  error: boolean;
  fieldList: { listOfField: Field[]; numOfField: number };
  activeFieldId: Field | null;
};

const initialState: FieldState = {
  isLoading: false,
  error: false,
  activeFieldId: null,
  fieldList: { listOfField: [], numOfField: 0 }
};

const slice = createSlice({
  name: 'fields',
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

    getFieldByIdSuccess(state, action) {
      state.isLoading = false;
      state.activeFieldId = action.payload;
    },
    // GET MANAGE USERS
    getFieldListSuccess(state, action) {
      state.isLoading = false;
      state.fieldList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export function getFieldList(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await OtherKrowdAPI.getField({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getFieldListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFieldById(fieldId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/fields/${fieldId}`
      );
      dispatch(slice.actions.getFieldByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//delete
export function delFieldListById(fieldId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await OtherKrowdAPI.delFieldID({ id: fieldId });
      dispatch(getFieldList(1, 5));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
