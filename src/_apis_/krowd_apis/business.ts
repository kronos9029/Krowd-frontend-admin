import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_SUBMIT = 'businesses/status';
type BusinessFormPost = {
  name: string;
  address: string;
  email: string;
  phoneNum: string;
  taxIdentificationNumber: string;
  fieldId: string;
};
const API_FIELD = 'businesses';
type BusinessFormPost2 = {
  name: string;
  address: string;
  email: string;
  phoneNum: string;
  taxIdentificationNumber: string;
  fieldId: string;
};
type BusinessFormPut = {
  id: string;
  email: string;
  name: string;
  phoneNum: string;
  address: string;
  taxIdentificationNumber: string;
  description: string;
};
function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeaderFormData() {
  const token = getToken();
  return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
}
function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}
async function post2({
  name,
  address,
  email,
  phoneNum,
  taxIdentificationNumber,
  fieldId
}: BusinessFormPost2) {
  const header = getHeaderFormData();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('email', email);
  formData.append('phoneNum', phoneNum);
  formData.append('taxIdentificationNumber', taxIdentificationNumber);

  await axios({
    method: 'post',
    url: REACT_APP_API_URL + `businesses`,
    params: { fieldIdList: fieldId },
    data: formData,
    headers: header
  });
}
async function getBuMID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `businesses/${id ?? 'null'}`, {
    headers: headers
  });
  return response;
}
async function gets(params: { pageIndex: number; pageSize: number; status: string; name: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `businesses`, {
    headers: headers,
    params: params
  });
  return response;
}
async function post({
  name,
  address,
  email,
  phoneNum,
  taxIdentificationNumber,
  fieldId
}: BusinessFormPost) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('email', email);
  formData.append('phoneNum', phoneNum);
  formData.append('taxIdentificationNumber', taxIdentificationNumber);

  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    params: { fieldIdList: fieldId },
    data: formData,
    headers: headers
  });
}
async function approveBusiness({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},ACTIVE`,
    headers: headers
  });
  return response;
}
async function deniedBusiness({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + `${API_SUBMIT}/${id},INACTIVE`,
    headers: headers
  });
  return response;
}
async function put({
  id,
  email,
  name,
  phoneNum,
  address,
  taxIdentificationNumber,
  description
}: BusinessFormPut) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('address', address);
  formData.append('phoneNum', phoneNum);
  formData.append('taxIdentificationNumber', taxIdentificationNumber);
  formData.append('description', description ?? '');
  await axios({
    method: 'put',
    url: REACT_APP_API_URL + `businesses/${id}`,
    data: formData,
    headers: headers
  });
}
export const BusinessAPI = {
  post: post,
  getBuMID: getBuMID,
  gets: gets,
  approveBusiness: approveBusiness,
  deniedBusiness: deniedBusiness,
  post2: post2,
  put: put
};
