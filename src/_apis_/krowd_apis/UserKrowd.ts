import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'users';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getUserKrowd() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}`, {
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
export const UserKrowdAPI = {
  getUserKrowd: getUserKrowd,
  post: post,
  getUserID: getUserID
};
