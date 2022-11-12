import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import {
  AccountTransaction,
  PeriodRevenueHistory,
  WalletTransaction
} from '../../../@types/krowd/transactionKrowd/transaction';
import { TransactionAPI } from '_apis_/krowd_apis/transactions';

// ----------------------------------------------------------------------

type TransactionState = {
  isLoading: boolean;
  error: boolean;
  accountTransactionList: {
    numOfAccountTransaction: number;
    listOfAccountTransaction: AccountTransaction[];
  };
  accountTransactionListId: AccountTransaction | null;
  walletTransactionList: WalletTransaction[];
  PeriodRevenueHistoryList: PeriodRevenueHistory[];
};

const initialState: TransactionState = {
  isLoading: false,
  error: false,
  accountTransactionList: {
    numOfAccountTransaction: 0,
    listOfAccountTransaction: []
  },
  walletTransactionList: [],
  accountTransactionListId: null,
  PeriodRevenueHistoryList: []
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
    getAccountTransactionListSuccess(state, action) {
      state.isLoading = false;
      state.accountTransactionList = action.payload;
    },

    getWalletTransactionListSuccess(state, action) {
      state.isLoading = false;
      state.walletTransactionList = action.payload;
    },

    getPeriodRevenueHistoryListSuccess(state, action) {
      state.isLoading = false;
      state.PeriodRevenueHistoryList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

export function getAccountTransactionList(
  fromDate: string,
  toDate: string,
  pageIndex: number,
  pageSize: number
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await TransactionAPI.getTransactions({
        fromDate: fromDate,
        toDate: toDate,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getAccountTransactionListSuccess(response.data));
      console.log('AccountTransaction data: ', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getWalletTransactionList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/wallet_transactions'
      );
      dispatch(slice.actions.getWalletTransactionListSuccess(response.data));
      console.log('wallet_transactions data: ', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getPeriodRevenueHistoryList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/period_revenue_histories'
      );
      dispatch(slice.actions.getPeriodRevenueHistoryListSuccess(response.data));
      console.log('period_revenue_histories data: ', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
