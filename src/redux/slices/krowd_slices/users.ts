import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { UserKrowd } from '../../../@types/krowd/users';
import axios from 'axios';

// ----------------------------------------------------------------------

type UserKrowdState = {
  isLoading: boolean;
  error: boolean;
  userKrowdList: UserKrowd[];
};

const initialState: UserKrowdState = {
  isLoading: false,
  error: false,
  userKrowdList: []
};

const slice = createSlice({
  name: 'userKrowd',
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
    //   const deleteUser = filter(state.UserKrowdList, (user) => user.id !== action.payload);
    //   state.UserKrowdList = deleteUser;
    // },

    // GET MANAGE USERS
    getUserKrowdListSuccess(state, action) {
      state.isLoading = false;
      state.userKrowdList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getUserKrowdList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users'
      );
      dispatch(slice.actions.getUserKrowdListSuccess(response.data));
      console.log('User', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
