import request from '../../utils/axios';

export const uploadfile = (fileData) =>
  request.post(`/files`, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
