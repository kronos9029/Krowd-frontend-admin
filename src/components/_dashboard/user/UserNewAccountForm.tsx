import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import firebase from 'firebase/app';

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
  FormControlLabel,
  Button
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
import { postBusiness } from 'redux/slices/krowd_slices/business';
import axios from 'axios';
import { dispatch } from 'redux/store';
import { slice } from 'lodash';
import { useForm } from 'react-hook-form';
import FirebaseService from 'api/firebase';
// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: Business;
};

export default function UserNewAccountForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState(Math.random().toString(36).slice(2));
  const NewBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên doanh nghiệp'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu'),
    email: Yup.string().required('Yêu cầu nhập email').email()
  });
  const generatePassword = () => {
    // Create a random password
    const randomPassword = Math.random().toString(36).slice(2);

    // Set the generated password as state
    setPassword(randomPassword);
    setFieldValue('password', password);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      password: password,
      email: currentUser?.email || ''
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        FirebaseService.createTempBusinessFirebase(
          formik.getFieldProps('email').value,
          formik.getFieldProps('password').value,
          formik.getFieldProps('name').value
        );
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('Tạo mới thành công', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.business.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên đầy đủ"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    label="Mật khẩu"
                    value={password}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button onClick={generatePassword}>Generate password</Button>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Lưu thay đổi'}
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
