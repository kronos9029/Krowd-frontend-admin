import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_TRANSACTION = 'account_transactions';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getTransactions(params: {
  fromDate: string;
  toDate: string;
  pageIndex: number;
  pageSize: number;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_TRANSACTION}`, {
    headers: headers,
    params: params
  });
  return response;
}

export const TransactionAPI = {
  getTransactions: getTransactions
};
