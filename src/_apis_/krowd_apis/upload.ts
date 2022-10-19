import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
const API_FIELD = 'upload-files/firebase';
function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeaderFormData() {
  const token = getToken();
  return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
}
async function postUserAvatar({ id, file }: { id: string; file: File | null }) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  if (file === null) {
    console.error('No file to upload');
    throw new Error('No file to upload');
  }
  formData.append('entityName', 'user');
  formData.append('entityId', id);
  formData.append('files', file);
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    data: formData,
    headers: headers
  });
}
async function postImagePicture({ id, file }: { id: string; file: File | null }) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  if (file === null) {
    console.error('No file to upload');
    throw new Error('No file to upload');
  }
  formData.append('entityName', 'project');
  formData.append('entityId', id);
  formData.append('files', file);
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    data: formData,
    headers: headers
  });
}
async function postAlbum({ id, file }: { id: string; file: File | null }) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  if (file === null) {
    console.error('No file to upload');
    throw new Error('No file to upload');
  }
  formData.append('entityName', 'projectEntity');
  formData.append('type', 'ALBUM');
  formData.append('entityId', id);
  formData.append('files', file);
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    data: formData,
    headers: headers
  });
}

async function postBusinessLogo({ businessId, file }: { businessId: string; file: File | null }) {
  const headers = getHeaderFormData();
  const formData = new FormData();
  if (file === null) {
    console.error('No file to upload');
    throw new Error('No file to upload');
  }
  formData.append('entityName', 'business');
  formData.append('entityId', businessId);
  formData.append('files', file);
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + API_FIELD,
    data: formData,
    headers: headers
  });
}

export const UploadAPI = {
  postUserAvatar: postUserAvatar,
  postBusinessLogo: postBusinessLogo,
  postAlbum: postAlbum,
  postImagePicture: postImagePicture
};
