import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_FIELD = 'fields';
const API_AREA = 'areas';
const API_SUBMIT = 'projects/status';
const API_PACKAGE = 'packages/project';
const API_FIELD_CHART = 'stages/chart';

type FieldFormPost = {
  name: string;
  description: string;
};
function getToken() {
  return window.localStorage.getItem('accessToken');
}
function getHeaderFormData() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
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

async function post({ name, description }: FieldFormPost) {
  const headers = getHeader();
  const body = {
    name: name,
    description: description
  };
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    data: body,
    headers: headers
  });
}
async function delFieldID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.delete(REACT_APP_API_URL + `${API_FIELD}/${id}`, {
    headers: headers
  });
  return response;
}
async function getField(params: { pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_FIELD}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getArea(params: { pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_AREA}`, {
    headers: headers,
    params: params
  });
  return response;
}
export const OtherKrowdAPI = {
  get: get,
  post: post,
  delFieldID: delFieldID,
  getField: getField,
  getArea: getArea
};
