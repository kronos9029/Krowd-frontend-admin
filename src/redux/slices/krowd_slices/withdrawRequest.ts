import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { WithdrawRequestType } from '../../../@types/krowd/withdrawRequest/withdrawRequest';
import { WithdrawRequestAPI } from '_apis_/krowd_apis/withdrawRequest';

// ----------------------------------------------------------------------

type WithdrawRequestState = {
  isLoading: boolean;
  error: boolean;
  withdrawRequestList: {
    listOfWithdrawRequest: WithdrawRequestType[];
    numOfWithdrawRequest: number;
  };
};

const initialState: WithdrawRequestState = {
  isLoading: false,
  error: false,
  withdrawRequestList: {
    listOfWithdrawRequest: [],
    numOfWithdrawRequest: 0
  }
};

const slice = createSlice({
  name: 'transaction',
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
    // GET LIST SUCCESS
    getAllWithdrawRequest(state, action) {
      state.isLoading = false;
      state.withdrawRequestList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

export function getAllWithdrawRequest(
  pageIndex: number,
  pageSize: number,
  userId: string,
  filter: string
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await WithdrawRequestAPI.getAll({
        pageIndex: pageIndex,
        pageSize: pageSize,
        userId: userId,
        filter: filter
      });
      dispatch(slice.actions.getAllWithdrawRequest(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
