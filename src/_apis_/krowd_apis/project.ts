import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'projects';
const API_SUBMIT = 'projects/status';
const API_PACKAGE = 'packages/project';
const API_FIELD_CHART = 'stages/chart';
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
async function approveProject({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},WAITING_TO_PUBLISH`,
    headers: headers
  });
  return response;
}
async function activateProject({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},ACTIVE`,
    headers: headers
  });
  return response;
}
async function rejectProject({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},DENIED `,
    headers: headers
  });
  return response;
}

async function getAll(params: {
  status: string;
  pageIndex: number;
  pageSize: number;
  name: string;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `projects`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getProjectByID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}/${id}`, {
    headers: headers
  });
  return response;
}
async function getProjectPackage({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PACKAGE}/${id}`, {
    headers: headers
  });
  return response;
}
async function getChartList({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD_CHART}/${id}`, {
    headers: headers
  });
  return response;
}
export const ProjectAPI = {
  get: get,
  getAll: getAll,
  approveProject: approveProject,
  activateProject: activateProject,
  getProjectByID: getProjectByID,
  getProjectPackage: getProjectPackage,
  rejectProject: rejectProject,
  getChartList: getChartList
};
