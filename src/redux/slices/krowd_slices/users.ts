import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { UserKrowd, WalletTransaction } from '../../../@types/krowd/users';
import axios from 'axios';
import { SnackbarKey, useSnackbar } from 'notistack';
import { UserKrowdAPI } from '_apis_/krowd_apis/UserKrowd';

// ----------------------------------------------------------------------

export type UserKrowdState = {
  isLoading: boolean;
  userKrowdDetail: UserKrowd | null;
  userLists: {
    numOfUser: number;
    listOfUser: UserKrowd[];
  };
  error: boolean;
  mainUserState: {
    isLoading: boolean;
    user: UserKrowd | null;
    error: boolean;
  };
  userKrowdDetailState: {
    isLoading: boolean;
    userKrowdDetail: UserKrowd | null;
    error: boolean;
  };
  walletTransactionState: {
    isLoading: boolean;
    listOfWalletTransaction: WalletTransaction[];
    numOfWalletTransaction: number;
    error: boolean;
  };
};

const initialState: UserKrowdState = {
  //AUTH_USER
  mainUserState: {
    isLoading: false,
    user: null,
    error: false
  },
  walletTransactionState: {
    isLoading: false,
    listOfWalletTransaction: [],
    numOfWalletTransaction: 0,
    error: false
  },
  isLoading: false,
  userKrowdDetail: null,
  userLists: {
    numOfUser: 0,
    listOfUser: []
  },
  error: false,
  //DETAILS
  userKrowdDetailState: {
    isLoading: false,
    userKrowdDetail: null,
    error: false
  }
};

const slice = createSlice({
  name: 'userKrowd',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //---------------MAIN USER-----------------
    startMainUserLoading(state) {
      state.mainUserState.isLoading = true;
    },
    // GET MANAGE INVESTOR
    getMainUserSuccess(state, action) {
      state.mainUserState.isLoading = false;
      state.mainUserState.user = action.payload;
    },
    // HAS ERROR
    hasMainUserError(state, action) {
      state.mainUserState.isLoading = false;
      state.mainUserState.error = action.payload;
    },
    // GET MANAGE INVESTOR
    getUserKrowdListSuccess(state, action) {
      state.isLoading = false;
      state.userLists = action.payload;
    },
    //
    getUserKrowdByIdSuccess(state, action) {
      state.isLoading = false;
      state.userKrowdDetail = action.payload;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //-------------------DETAIL OF userKrowd------------------
    // START LOADING
    startUserKrowdDetailLoading(state) {
      state.userKrowdDetailState.isLoading = true;
    },
    // ------ GET ALL TRANSACTION WALLET------------ //
    startLoadingWalletTransactionList(state) {
      state.walletTransactionState.isLoading = true;
    },
    hasGetWalletTransactionError(state, action) {
      state.walletTransactionState.isLoading = false;
      state.walletTransactionState.error = action.payload;
    },
    getWalletTransactionListSuccess(state, action) {
      state.walletTransactionState.isLoading = false;
      state.walletTransactionState = action.payload;
    },
    // GET MANAGE userKrowd DETAIL
    getUserKrowdDetailSuccess(state, action) {
      state.userKrowdDetailState.isLoading = false;
      state.userKrowdDetailState.userKrowdDetail = action.payload;
    },
    deleteUserKrowdDetailSuccess(state) {
      state.userKrowdDetailState.isLoading = false;
    },
    updateEmailUserKrowdDetailSuccess(state) {
      state.userKrowdDetailState.isLoading = false;
    },
    // HAS ERROR
    hasUserKrowdDetailError(state, action) {
      state.userKrowdDetailState.isLoading = false;
      state.userKrowdDetailState.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export function getMainUserProfile(id: string) {
  return async () => {
    dispatch(slice.actions.startMainUserLoading());
    try {
      const response = await UserKrowdAPI.getUserID({ id });
      dispatch(slice.actions.getMainUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasMainUserError(error));
    }
  };
}
export function getUserKrowdList(role: string, pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await UserKrowdAPI.getUserKrowd({
        role: role,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getUserKrowdListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserKrowdDetail(id: string) {
  return async () => {
    dispatch(slice.actions.startUserKrowdDetailLoading());
    try {
      const response = await UserKrowdAPI.getUserID({ id });
      dispatch(slice.actions.getUserKrowdDetailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasUserKrowdDetailError(error));
    }
  };
}
export function getWalletTransactionList(userId: string, pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingWalletTransactionList());
    try {
      const response = await UserKrowdAPI.getsWalletTransaction({
        userId: userId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getWalletTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWalletTransactionError(error));
    }
  };
}
export function deleteUser(userID: string) {
  return async () => {
    dispatch(slice.actions.startUserKrowdDetailLoading());
    try {
      await axios
        .delete(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users/${userID}`
        )
        .then(() => dispatch(slice.actions.deleteUserKrowdDetailSuccess()));
    } catch (error) {
      dispatch(slice.actions.hasUserKrowdDetailError(error));
    }
  };
}
export function updateEmailUser(userID: string, email: string) {
  return async () => {
    dispatch(slice.actions.startUserKrowdDetailLoading());
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      await axios({
        method: 'put',
        url: `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users/${userID}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(slice.actions.updateEmailUserKrowdDetailSuccess());
    } catch (error) {
      dispatch(slice.actions.hasUserKrowdDetailError(true));
    }
  };
}
