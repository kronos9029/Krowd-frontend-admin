import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'withdraw_requests';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}
async function getAll(params: {
  pageIndex: number;
  pageSize: number;
  userId: string;
  filter: string;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + API_FIELD, {
    headers: headers,
    params: params
  });
  return response;
}
async function approveWithdrawRequest({
  requestId,
  receipt
}: {
  requestId: string;
  receipt: File;
}) {
  const headers = getHeader();
  const formData = new FormData();
  formData.append('requestId', requestId);
  formData.append('receipt', receipt);
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + API_FIELD,
    params: { action: 'APPROVE' },
    data: formData,
    headers: headers
  });
  return response;
}
async function refuseWithdrawRequest({
  requestId,
  refusalReason
}: {
  requestId: string;
  refusalReason: string;
}) {
  const headers = getHeader();
  const formData = new FormData();
  formData.append('requestId', requestId);
  formData.append('refusalReason', refusalReason);
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + API_FIELD,
    params: { action: 'REJECT' },
    data: formData,
    headers: headers
  });
  return response;
}
export const WithdrawRequestAPI = {
  getAll: getAll,
  approveWithdrawRequest: approveWithdrawRequest,
  refuseWithdrawRequest: refuseWithdrawRequest
};
