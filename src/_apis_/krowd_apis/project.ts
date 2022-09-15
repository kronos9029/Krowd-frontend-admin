import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'projects';
const API_SUBMIT = 'projects/status';
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
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},CALLING_FOR_INVESTMENT`,
    headers: headers
  });
  return response;
}

async function getAll() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `projects`, {
    headers: headers
  });
  return response;
}
export const ProjectAPI = {
  get: get,
  getAll: getAll,
  approveProject: approveProject
};
