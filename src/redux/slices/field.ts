import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from 'axios';
import { Field } from '../../@types/fields';

// ----------------------------------------------------------------------

type FieldState = {
  isLoading: boolean;
  error: boolean;
  fieldList: Field[];
};

const initialState: FieldState = {
  isLoading: false,
  error: false,
  fieldList: []
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

    // // DELETE USERS
    // deleteUser(state, action) {
    //   const deleteUser = filter(state.FieldList, (user) => user.id !== action.payload);
    //   state.FieldList = deleteUser;
    // },

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

export function getFieldList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/fields'
      );
      dispatch(slice.actions.getFieldListSuccess(response.data));
      console.log('Field', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
