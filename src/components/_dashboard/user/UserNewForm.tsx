import * as Yup from 'yup';
import { useCallback } from 'react';
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
import { BusinessManager } from '../../../@types/krowd/business';
import { postBusiness } from 'redux/slices/krowd_slices/business';
import axios from 'axios';
import { dispatch } from 'redux/store';
import { slice } from 'lodash';

// ----------------------------------------------------------------------

type UserNewFormProps = {
  isEdit: boolean;
  currentUser?: BusinessManager;
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên'),
    phoneNum: Yup.string().required('Phone number is required'),
    // image: Yup.mixed().required('image is required'),
    email: Yup.string().required('Email is required').email(),
    description: Yup.string().required('Yêu cầu nhập mô tả'),
    taxIdentificationNumber: Yup.string().required('taxIdentificationNumber is required'),
    address: Yup.string().required('Address is required')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      phoneNum: currentUser?.phoneNum || '',
      image: currentUser?.image || null,
      email: currentUser?.email || '',
      description: currentUser?.description || '',
      taxIdentificationNumber: currentUser?.taxIdentificationNumber || '',
      address: currentUser?.address || ''
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await axios.post(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses`,
          values
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
  console.log('name', formik);

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                {/* <UploadAvatar
                  accept="image/*"
                  file={values.image}
                  onDrop={handleDrop}
                  error={Boolean(touched.image && errors.image)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.image && errors.image}
                </FormHelperText> */}
              </Box>
            </Card>
          </Grid>

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
                    label="Di động"
                    {...getFieldProps('phoneNum')}
                    error={Boolean(touched.phoneNum && errors.phoneNum)}
                    helperText={touched.phoneNum && errors.phoneNum}
                  />

                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã số thuế"
                    {...getFieldProps('taxIdentificationNumber')}
                    error={Boolean(
                      touched.taxIdentificationNumber && errors.taxIdentificationNumber
                    )}
                    helperText={touched.taxIdentificationNumber && errors.taxIdentificationNumber}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
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
