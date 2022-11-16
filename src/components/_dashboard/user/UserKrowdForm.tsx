import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Grid,
  Dialog,
  Button,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  DialogContentText,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { dispatch, RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { REACT_APP_API_URL } from 'config';
import { UserKrowd } from '../../../@types/krowd/users';
import { getMainUserProfile } from 'redux/slices/krowd_slices/users';
import { fDateTimeSuffix2 } from 'utils/formatTime';
// @types

// ----------------------------------------------------------------------

type UserAccountFormProps = {
  user: UserKrowd;
  open: boolean;
  onClose: VoidFunction;
};

export default function UserKrowdForm({ user, open, onClose }: UserAccountFormProps) {
  const NewAddressSchema = Yup.object().shape({
    phoneNum: Yup.string().required('Yêu cầu nhập số điện thoại'),
    district: Yup.string().required('Yêu cầu nhập quận của bạn'),
    address: Yup.string().required('Yêu cầu nhập địa chỉ'),
    firstName: Yup.string().required('Yêu cầu nhập họ của bạn'),
    lastName: Yup.string().required('Yêu cầu nhập tên của bạn')
  });

  const [value, setValue] = useState<Date | null>(new Date(user?.dateOfBirth ?? 'dd/MM/yyyy'));
  const [valueMinDate, setMinDate] = useState<Date | null>(new Date('1950/12/31'));
  const [valueMaxDate, setMaxDate] = useState<Date | null>(new Date('2003/12/31'));
  const GENDER_OPTION = ['Nam', 'Nữ', 'Khác'];
  const { enqueueSnackbar } = useSnackbar();
  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
  }
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    setFieldValue('dateOfBirth', fDateTimeSuffix2(newValue!));
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      phoneNum: user?.phoneNum ?? '',
      address: user?.address ?? '',
      gender: user?.gender ?? 'Nam',
      idCard: user?.idCard ?? '',
      district: user?.district ?? '',
      city: user?.city ?? '',
      bankName: user?.bankName ?? '',
      bankAccount: user?.bankAccount ?? '',
      taxIdentificationNumber: user?.taxIdentificationNumber ?? '',
      dateOfBirth: user?.dateOfBirth ?? ''
    },
    validationSchema: NewAddressSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (user === null) {
          throw new Error('User null');
        }
        const formData = new FormData();
        const header = getHeaderFormData();
        formData.append('firstName', values.firstName);
        formData.append('email', user?.email);
        formData.append('lastName', values.lastName ?? '');
        formData.append('phoneNum', values.phoneNum);
        formData.append('city', values.city);
        formData.append('district', values.district);
        formData.append('address', values.address);
        formData.append('idCard', values.idCard);
        formData.append('bankName', values.bankName);
        formData.append('dateOfBirth', `${values.dateOfBirth}`);
        formData.append('taxIdentificationNumber', values.taxIdentificationNumber);
        formData.append('bankAccount', values.bankAccount);
        formData.append('gender', values.gender);
        await axios({
          method: 'put',
          url: REACT_APP_API_URL + `users/${user.id}`,
          data: formData,
          headers: header
        })
          .then(() => {
            enqueueSnackbar('Cập nhật thông tin thành công', {
              variant: 'success'
            });
            dispatch(getMainUserProfile(user?.id));
            onClose();
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật thất bại vui lòng kiểm tra các thông tin cần thiết', {
              variant: 'error'
            });
          });
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
          <DialogContent>
            <Box my={3}>
              <DialogContentText>Cập nhật thông tin của bạn ở bên dưới</DialogContentText>
              <Typography variant="caption" color="#B78103">
                * Những thông tin trống vui lòng điền "N/A".
              </Typography>
            </Box>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography>Thông tin cá nhân:</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  required
                  label="Họ"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Tên"
                  required
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

                <FormControl sx={{ width: '270px' }}>
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    label="Giới tính"
                    required
                    native
                    {...getFieldProps('gender')}
                    value={values.gender}
                  >
                    {GENDER_OPTION.map((category, i) => (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Grid xs={12} md={5}>
                  <DatePicker
                    label="Ngày sinh"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    minDate={valueMinDate!}
                    maxDate={valueMaxDate!}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      />
                    )}
                  />
                </Grid>
                <TextField
                  required
                  label="SĐT"
                  variant="outlined"
                  {...getFieldProps('phoneNum')}
                  error={Boolean(touched.phoneNum && errors.phoneNum)}
                  helperText={touched.phoneNum && errors.phoneNum}
                />
                <TextField
                  required
                  label="CMND/CCCD"
                  variant="outlined"
                  {...getFieldProps('idCard')}
                  error={Boolean(touched.idCard && errors.idCard)}
                  helperText={touched.idCard && errors.idCard}
                />
              </Stack>
              <Typography>Địa chỉ:</Typography>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  required
                  label="Số nhà, tên đường"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  required
                  label="Thành phố"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('city')}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                />
                <TextField
                  required
                  label="Quận"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('district')}
                  error={Boolean(touched.district && errors.district)}
                  helperText={touched.district && errors.district}
                />
              </Stack>
              <Typography>Ngân hàng</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  required
                  label="Tên ngân hàng"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('bankName')}
                  error={Boolean(touched.bankName && errors.bankName)}
                  helperText={touched.bankName && errors.bankName}
                />
                <TextField
                  required
                  label="Số tài khoản"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('bankAccount')}
                  error={Boolean(touched.bankAccount && errors.bankAccount)}
                  helperText={touched.bankAccount && errors.bankAccount}
                />
                <TextField
                  required
                  label="Mã số thuế"
                  fullWidth
                  variant="outlined"
                  {...getFieldProps('taxIdentificationNumber')}
                  error={Boolean(touched.taxIdentificationNumber && errors.taxIdentificationNumber)}
                  helperText={touched.taxIdentificationNumber && errors.taxIdentificationNumber}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Lưu
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
