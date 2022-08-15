import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography,
  Chip
} from '@mui/material';
// utils
// routes
// @types
//
import FirebaseService from 'api/firebase';
import { Business, TempBusiness } from '../../../../@types/krowd/business';
import { PATH_DASHBOARD } from 'routes/paths';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
// ----------------------------------------------------------------------

type BusinessNewFormProps = {
  currentUser: TempBusiness | null;
  isLoading?: boolean;
};

export default function BusinessNewAccountForm({ currentUser, isLoading }: BusinessNewFormProps) {
  const { pathname } = useLocation();
  const isCreate = pathname.includes('new');
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
      name: currentUser?.displayName || '',
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
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  return (
    <Page title="Doanh nghiệp: Tạo mới | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={isCreate ? 'Tạo mới tài khoản doanh nghiệp' : 'Cập nhật người dùng'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Tạo mới' }]}
        />
        {(isLoading && (
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        )) || (
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
                          disabled
                          label="Mật khẩu"
                          value={currentUser?.password ?? password}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                        {isCreate && <Button onClick={generatePassword}>Khởi tạo mật khẩu</Button>}
                      </Stack>
                      {!isCreate && (
                        <>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <TextField
                              value={currentUser?.description ?? 'Doanh nghiệp chưa cập nhật'}
                              disabled
                              fullWidth
                              label="Mô tả"
                            />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <TextField
                              value={currentUser?.phoneNum ?? 'Doanh nghiệp chưa cập nhật'}
                              disabled
                              fullWidth
                              label="Số điện thoại"
                            />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <TextField
                              value={currentUser?.address ?? 'Doanh nghiệp chưa cập nhật'}
                              disabled
                              fullWidth
                              label="Địa chỉ"
                            />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <TextField
                              fullWidth
                              value={
                                currentUser?.taxIdentificationNumber ?? 'Doanh nghiệp chưa cập nhật'
                              }
                              disabled
                              label="Mã doanh nghiệp"
                            />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            {currentUser?.fieldList.map((e) => (
                              <Chip key={e.id} label={e.name} />
                            ))}
                          </Stack>
                        </>
                      )}
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          {isCreate ? 'Tạo doanh nghiệp' : 'Lưu thay đổi'}
                        </LoadingButton>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        )}
      </Container>
    </Page>
  );
}
