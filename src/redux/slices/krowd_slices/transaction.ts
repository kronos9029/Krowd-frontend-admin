import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import {
  AccountTransaction,
  Bill,
  ListOfDailyReport,
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
  //====================BILLS IN DAILY REPORT=========================
  biilDailyReportState: {
    isLoading: boolean;
    listOfBill: Bill[];
    numOfBill: number;
    error: boolean;
  };
  //====================DAILY REPORT==================================
  dailyReportState: {
    isLoading: boolean;
    listOfDailyReport: ListOfDailyReport[];
    numOfDailyReport: number;
    error: boolean;
  };
  dailyReportDetails: {
    isLoading: boolean;
    DailyDetails: ListOfDailyReport | null;
    numOfDailyReport: number;
    error: boolean;
  };
};

const initialState: TransactionState = {
  isLoading: false,
  error: false,
  accountTransactionList: {
    numOfAccountTransaction: 0,
    listOfAccountTransaction: []
  },
  //====================BILLS IN DAILY REPORT=========================

  biilDailyReportState: {
    isLoading: false,
    listOfBill: [],
    numOfBill: 0,
    error: false
  },
  //====================DAILY REPORT==================================

  dailyReportState: {
    isLoading: false,
    listOfDailyReport: [],
    numOfDailyReport: 0,
    error: false
  },
  dailyReportDetails: {
    isLoading: false,
    DailyDetails: null,
    numOfDailyReport: 0,
    error: false
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
    // ------ GET ALL BILL IN DAILY REPORT------------ //

    startLoadingBillDailyReportList(state) {
      state.biilDailyReportState.isLoading = true;
    },
    hasGetBillDailyReportError(state, action) {
      state.biilDailyReportState.isLoading = false;
      state.biilDailyReportState.error = action.payload;
    },
    getBillDailyReportSuccess(state, action) {
      state.biilDailyReportState.isLoading = false;
      state.biilDailyReportState = action.payload;
    },
    // ------ GET ALL DAILY REPORT------------ //

    startLoadingDailyReportList(state) {
      state.dailyReportState.isLoading = true;
    },
    hasGetDailyReportError(state, action) {
      state.dailyReportState.isLoading = false;
      state.dailyReportState.error = action.payload;
    },
    getDailyReportSuccess(state, action) {
      state.dailyReportState.isLoading = false;
      state.dailyReportState = action.payload;
    },

    // ------ GET ALL DAILY WITH ID------------ //
    startLoadingDailyReportDetails(state) {
      state.dailyReportDetails.isLoading = true;
    },
    hasGetDailyReportDetailsError(state, action) {
      state.dailyReportDetails.isLoading = false;
      state.dailyReportDetails.error = action.payload;
    },
    getDailyReportDetailsSuccess(state, action) {
      state.dailyReportDetails.isLoading = false;
      state.dailyReportDetails.DailyDetails = action.payload;
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
//---------------------------- GET ALL BILL IN DAILY REPORT------------------------------

export function getBillDailyReport(dailyId: string, pageIndex: number) {
  return async () => {
    dispatch(slice.actions.startLoadingBillDailyReportList());
    try {
      const response = await TransactionAPI.getsBillDailyReport(dailyId, pageIndex);
      dispatch(slice.actions.getBillDailyReportSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetBillDailyReportError(error));
    }
  };
}
//---------------------------- GET ALL DAILY REPORT------------------------------

export function getDailyReportProjectID(projectId: string, pageIndex: number) {
  return async () => {
    dispatch(slice.actions.startLoadingDailyReportList());
    try {
      const response = await TransactionAPI.getsDailyReport(projectId, pageIndex);
      dispatch(slice.actions.getDailyReportSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetDailyReportError(error));
    }
  };
}
//---------------------------- GET DAILY REPORT ID------------------------------

export function getDailyReportByID(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingDailyReportDetails());
    try {
      const response = await TransactionAPI.getsDailyReportByID(id);
      dispatch(slice.actions.getDailyReportDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetDailyReportDetailsError(error));
    }
  };
}
