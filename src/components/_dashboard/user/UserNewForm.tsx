import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
//
import Label from '../../Label';
import countries from './countries';
import { UploadAvatar } from 'components/upload';
import { Business } from '../../../@types/krowd/business';
import axios from 'axios';
import { dispatch } from 'redux/store';
import { slice } from 'lodash';
import { useForm } from 'react-hook-form';
import { UserKrowd } from '../../../@types/krowd/users';
// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: UserKrowd;
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBusinessSchema = Yup.object().shape({
    lastName: Yup.string().required('Yêu cầu nhập họ'),
    firstName: Yup.string().required('Yêu cầu nhập tên'),
    email: Yup.string().required('Yêu cầu nhập email').email()
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: currentUser?.lastName || '',
      firstName: currentUser?.firstName || '',
      image: currentUser?.image || '',
      email: currentUser?.email || '',
      roleId: '015ae3c5-eee9-4f5c-befb-57d41a43d9df'
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await axios.post(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users`,
          values
        );
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('Tạo mới thành công', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.admin.listBusiness);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  console.log(formik);
  // const handleDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   if (files !== null) {
  //     data.append('file', files[0]);
  //     data.append('upload_preset', 'KrowdRSI');
  //     setLoading(true);
  //     const res = fetch('https://api.cloudinary.com/v1_1/fpt-claudary/image/upload', {
  //       method: 'POST',
  //       body: data
  //     });
  //     // getFieldProps(files[0].name);
  //     console.log('t da upload dc', res);
  //     console.log('t da upload dc', files[0]);
  //     setLoading(false);
  //   }
  // };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <FormHelperText className="mb-2 ml-5">
                  <Form>Picture</Form>
                  <input type="file" onChange={handleDrop} />
                  {loading ? <h3>Loading...</h3> : <img src={picture} style={{ width: '300px' }} />}
                </FormHelperText>
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.image && errors.image}
                </FormHelperText>
              </Box>
            </Card>
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Họ"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="Tên"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />

                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Tạo mới' : 'Lưu thay đổi'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
