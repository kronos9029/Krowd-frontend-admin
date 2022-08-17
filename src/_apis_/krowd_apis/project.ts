import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';

function getToken() {
  return window.localStorage.getItem('accessToken');
}
function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `projects/${id}`, {
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
  getAll: getAll
};
