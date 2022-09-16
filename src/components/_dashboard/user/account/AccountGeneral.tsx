import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { UploadAvatar } from '../../../upload';
// utils
// @types
import { User } from '../../../../@types/account';
//
import { dispatch } from 'redux/store';
import { UserKrowd } from '../../../../@types/krowd/users';
import { getMainUserProfile } from 'redux/slices/krowd_slices/users';
import { UploadAPI } from '_apis_/krowd_apis/upload';

// ----------------------------------------------------------------------

interface InitialState extends Omit<User, 'password' | 'id' | 'role'> {
  afterSubmit?: string;
}
type AccountGeneralProps = {
  user: UserKrowd;
};
export default function AccountGeneral({ user }: AccountGeneralProps) {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const {
    firstName,
    lastName,
    phoneNum,
    email,
    gender,
    dateOfBirth,
    role,
    status,
    address,
    bankName,
    bankAccount,
    taxIdentificationNumber,
    city,
    district,
    idCard
  } = user;
  const formikImage = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: user.image
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(true);
        await UploadAPI.postUserAvatar({ id: user.id, file: fileUpload })
          .then(() => {
            enqueueSnackbar('Cập nhật ảnh thành công', {
              variant: 'success'
            });
            dispatch(getMainUserProfile(user.id));
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật ảnh thất bại', {
              variant: 'error'
            });
            setFileUpload(null);
            setFieldValueImage('photoURL', null);
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const {
    errors: errorsImage,
    values: valuesImage,
    touched: touchedImage,
    handleSubmit: handleSubmitImage,
    isSubmitting: isSubmittingImage,
    setFieldValue: setFieldValueImage,
    getFieldProps: getFieldPropsImage
  } = formikImage;
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValueImage('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
        setFileUpload(file);
      }
    },
    [setFieldValueImage]
  );
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <FormikProvider value={formikImage}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmitImage}>
            <UploadAvatar
              accept="image/*"
              file={valuesImage.photoURL}
              maxSize={3145728}
              onDrop={handleDrop}
              error={Boolean(touchedImage.photoURL && errorsImage.photoURL)}
            />
            {fileUpload && (
              <Box display="flex" my={3} justifyContent="space-evenly">
                <LoadingButton
                  color="warning"
                  type="submit"
                  variant="contained"
                  loading={isSubmittingImage}
                >
                  Lưu
                </LoadingButton>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setFileUpload(null);
                    setFieldValueImage('photoURL', user.image);
                  }}
                >
                  Hủy
                </Button>
              </Box>
            )}
          </Form>
        </FormikProvider>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            <Typography sx={{ fontWeight: '700' }}>Thông tin cá nhân</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth disabled label="Họ và tên" value={`${firstName} ${lastName}`} />
              <TextField fullWidth disabled label="Email" value={email} />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                disabled
                label="Ngày sinh"
                value={dateOfBirth ?? '<Chưa cập nhật>'}
              />
              <TextField fullWidth disabled label="Giới tính" value={gender ?? '<Chưa cập nhật>'} />
              <TextField fullWidth disabled label="SĐT" value={phoneNum ?? '<Chưa cập nhật>'} />
              <TextField fullWidth disabled label="CMND/CCCD" value={idCard ?? '<Chưa cập nhật>'} />
            </Stack>
            <Typography sx={{ fontWeight: '700' }}>Địa chỉ</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                disabled
                label="Số nhà, tên đường"
                value={address ?? '<Chưa cập nhật>'}
              />
              <TextField fullWidth disabled label="Thành phố" value={city ?? '<Chưa cập nhật>'} />
              <TextField fullWidth disabled label="Quận" value={district ?? '<Chưa cập nhật>'} />
            </Stack>
            <Typography sx={{ fontWeight: '700' }}>Ngân hàng</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                disabled
                label="Tên ngân hàng"
                value={bankName ?? '<Chưa cập nhật>'}
              />
              <TextField
                fullWidth
                disabled
                label="Số tài khoản"
                value={bankAccount ?? '<Chưa cập nhật>'}
              />
              <TextField
                fullWidth
                disabled
                label="MST"
                value={taxIdentificationNumber ?? '<Chưa cập nhật>'}
              />
            </Stack>
            {/* <TextField fullWidth disabled label="Vai trò" value={role.name} /> */}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
