import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'users';
const API_WALLET_TRANSACTION = 'wallet_transactions';
const API_PAYMENTS = 'payments/type/INVESTMENT';
const PERIOD_REVENUE = 'payments/type/PERIOD_REVENUE';
function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getUserKrowd({ role }: { role: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}?role=${role}`, {
    headers: headers
  });
  return response;
}
//get user by Id
async function getUserID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}/${id ?? 'null'}`, {
    headers: headers
  });
  return response;
}
//post user
async function post() {
  const headers = getHeader();
  const response = await axios.post(REACT_APP_API_URL + `${API_FIELD}`, {
    headers: headers
  });
  return response;
}
async function getsWalletTransaction(id: string) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WALLET_TRANSACTION}?userId=${id}`, {
    headers: headers
  });
  return response;
}
async function getsPayment(id: string) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PAYMENTS}?userId=${id}`, {
    headers: headers
  });
  return response;
}
export const UserKrowdAPI = {
  getUserKrowd: getUserKrowd,
  post: post,
  getUserID: getUserID,
  getsWalletTransaction: getsWalletTransaction,
  getsPayment: getsPayment
};
