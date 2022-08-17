import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';

type BusinessFormPost = {
  name: string;
  address: string;
  email: string;
  phoneNum: string;
  taxIdentificationNumber: string;
  fieldId: string;
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
async function post({
  name,
  address,
  email,
  phoneNum,
  taxIdentificationNumber,
  fieldId
}: BusinessFormPost) {
  const header = getHeaderFormData();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('email', email);
  formData.append('phoneNum', phoneNum);
  formData.append('taxIdentificationNumber', taxIdentificationNumber);

  await axios({
    method: 'post',
    url: REACT_APP_API_URL + `/businesses`,
    params: { fieldIdList: fieldId },
    data: formData,
    headers: header
  });
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `/businesses/${id ?? 'null'}`, {
    headers: headers
  });
  return response;
}
export const BusinessAPI = {
  post: post,
  get: get
};
