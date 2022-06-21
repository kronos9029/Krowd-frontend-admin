import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { SystemWallet } from '../../../@types/krowd/wallet/systemWallet';

// ----------------------------------------------------------------------

type WalletState = {
  isLoading: boolean;
  error: boolean;
  walletSystem: SystemWallet[];
};

const initialState: WalletState = {
  isLoading: false,
  error: false,
  walletSystem: []
};

const slice = createSlice({
  name: 'wallet',
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
    getwalletSystemSuccess(state, action) {
      state.isLoading = false;
      state.walletSystem = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getwalletSystem() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/system_wallets'
      );
      dispatch(slice.actions.getwalletSystemSuccess(response.data));
      console.log('wallet data: ', response.data);
      console.log('get success');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
