import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_INVESTMENT = 'investments';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getsInvestment(params: { projectId: string; pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_INVESTMENT}`, {
    headers: headers,
    params: params
  });
  return response;
}

export const InvestmentAPI = {
  getsInvestment: getsInvestment
};
