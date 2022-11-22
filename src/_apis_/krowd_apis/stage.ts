import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
const API_FIELD = 'stages/chart';
const API_ALL_STAGE = 'stages/project';
const API_STAGE_ID = 'stages';
function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}/${id}`, {
    headers: headers
  });
  return response;
}
async function gets(id: string, pageIndex: number, status: string) {
  const headers = getHeader();
  const response = await axios.get(
    REACT_APP_API_URL + `${API_ALL_STAGE}/${id}?pageIndex=${pageIndex}&pageSize=8&status=${status}`,
    {
      headers: headers
    }
  );
  return response;
}
async function getStage(id: string) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_ALL_STAGE}/${id}`, {
    headers: headers
  });
  return response;
}
async function getStageId({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_STAGE_ID}/${id}`, {
    headers: headers
  });
  return response;
}

export const ProjectStageAPI = {
  gets: gets,
  get: get,
  getStageId: getStageId,
  getStage: getStage
};
