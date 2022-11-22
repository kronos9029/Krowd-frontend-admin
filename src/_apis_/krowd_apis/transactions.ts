import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_TRANSACTION = 'account_transactions';
const PERIOD_REVENUE = 'payments/type/PERIOD_REVENUE';
const API_DAILY_REPORT = 'daily_reports/project';
const API_BILL_DAILY_REPORT = 'bills/dailyReport';
const API_DAILY_REPORT_BY_ID = 'daily_reports';
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
async function getsBillDailyReport(id: string, pageIndex: number) {
  const headers = getHeader();

  const response = await axios.get(
    REACT_APP_API_URL + `${API_BILL_DAILY_REPORT}/${id}?pageIndex=${pageIndex}&pageSize=8`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsDailyReport(id: string, pageIndex: number) {
  const headers = getHeader();

  const response = await axios.get(
    REACT_APP_API_URL + `${API_DAILY_REPORT}/${id}?pageIndex=${pageIndex}&pageSize=8`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsDailyReportByID(id: string) {
  const headers = getHeader();

  const response = await axios.get(REACT_APP_API_URL + `${API_DAILY_REPORT_BY_ID}/${id}`, {
    headers: headers
  });
  return response;
}
export const TransactionAPI = {
  getTransactions: getTransactions,
  getsBillDailyReport: getsBillDailyReport,
  getsDailyReport: getsDailyReport,
  getsDailyReportByID: getsDailyReportByID
};
