import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { Roles } from '../../../@types/krowd/roleKrowd';

// ----------------------------------------------------------------------

type RolesState = {
  isLoading: boolean;
  error: boolean;
  rolesList: Roles[];
};

const initialState: RolesState = {
  isLoading: false,
  error: false,
  rolesList: []
};

const slice = createSlice({
  name: 'role',
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
    getRolesListSuccess(state, action) {
      state.isLoading = false;
      state.rolesList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getRolesList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/roles'
      );
      dispatch(slice.actions.getRolesListSuccess(response.data));
      console.log('roles data: ', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
