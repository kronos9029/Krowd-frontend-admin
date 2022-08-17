import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getUserKrowd() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + 'users', {
    headers: headers
  });
  return response;
}

export const UserKrowdAPI = {
  getUserKrowd: getUserKrowd
};
