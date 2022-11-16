import { useState, useEffect, useCallback } from 'react';
// material
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Stack,
  Card,
  Grid,
  DialogContent,
  DialogContentText
} from '@mui/material';
// redux
import * as Yup from 'yup';
import plusFill from '@iconify/icons-eva/plus-fill';

import { dispatch, RootState, useDispatch, useSelector } from 'redux/store';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { getBusinessById } from 'redux/slices/krowd_slices/business';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { Business } from '../../../../@types/krowd/business';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import Label from 'components/Label';
import { Form, FormikProvider, useFormik } from 'formik';
import { UploadAvatar } from 'components/upload';
import { UploadAPI } from '_apis_/krowd_apis/upload';
import { BusinessAPI } from '_apis_/krowd_apis/business';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';
import { Icon } from '@iconify/react';
import axios from 'axios';

// ----------------------------------------------------------------------

const STATUS_BUSINESS = 'ACTIVE';
export default function AdminBusinessDetail() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();

  const { businessDetailState } = useSelector((state: RootState) => state.business);
  const { businessDetail, isLoading } = businessDetailState;
  useEffect(() => {
    dispatch(getBusinessById(id));
  }, [dispatch]);

  return (
    <Page title="thương hiệu| Krowd dành cho thương hiệu">
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
      )) ||
        (businessDetail && <BusinessDetail business={businessDetail} />)}
    </Page>
  );
}

type BusinessManagerProps = {
  business: Business;
};
function BusinessDetail({ business }: BusinessManagerProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [openBusinessManager, setOpenBusinessManager] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileUploadManager, setFileUploadManager] = useState<File | null>(null);
  const EditBusinessSchema = Yup.object().shape({
    email: Yup.string().required('Yêu cầu nhập email thương hiệu').email('Email chưa hợp lệ'),
    name: Yup.string().required('Yêu cầu nhập tên'),
    phoneNum: Yup.string().required('Yêu cầu nhập số điện thoại'),
    address: Yup.string().required('Yêu cầu nhập địa chỉ')
  });
  const formikProfile = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: business.email,
      name: business.name,
      phoneNum: business.phoneNum,
      address: business.address,
      taxIdentificationNumber: business.taxIdentificationNumber,
      description: business.description
    },
    validationSchema: EditBusinessSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(true);
        const { email, name, phoneNum, address, taxIdentificationNumber, description } = values;
        await BusinessAPI.put({
          id: business.id,
          email: email,
          name: name,
          phoneNum: phoneNum,
          address: address,
          taxIdentificationNumber: taxIdentificationNumber,
          description: description
        })
          .then(() => {
            enqueueSnackbar('Cập nhật thương hiệu thành công', {
              variant: 'success'
            });
            dispatch(getBusinessById(business.id));
            resetForm();
            handleClose();
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật thương hiệu thất bại vui lòng kiểm tra lại thông tin', {
              variant: 'error'
            });
          });
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const {
    errors: errorsProfile,
    touched: touchedProfile,
    handleSubmit: handleSubmitProfile,
    isSubmitting: isSubmittingProfile,
    getFieldProps: getFieldPropsProfile
  } = formikProfile;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formikImage = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: business.image
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(true);
        await UploadAPI.postBusinessLogo({ businessId: business.id, file: fileUpload })
          .then(() => {
            enqueueSnackbar('Cập nhật ảnh thành công', {
              variant: 'success'
            });
            dispatch(getBusinessById(business.id));
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
    setFieldValue: setFieldValueImage
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
  const formikImageManager = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: business.manager?.image
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(true);
        await UploadAPI.postUserAvatar({ id: business.manager?.id, file: fileUploadManager })
          .then(() => {
            enqueueSnackbar('Cập nhật ảnh thành công', {
              variant: 'success'
            });
            dispatch(getBusinessById(business.id));
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật ảnh thất bại', {
              variant: 'error'
            });
            setFileUploadManager(null);
            setFieldValueImageManager('photoURL', null);
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const {
    errors: errorsImageManager,
    values: valuesImageManager,
    touched: touchedImageManager,
    handleSubmit: handleSubmitImageManager,
    isSubmitting: isSubmittingImageManager,
    setFieldValue: setFieldValueImageManager
  } = formikImageManager;

  const handleDropManager = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValueImageManager('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
        setFileUploadManager(file);
      }
    },
    [setFileUploadManager]
  );
  const NewBusinessSchema = Yup.object().shape({
    lastName: Yup.string().required('Yêu cầu nhập tên người quản lý thương hiệu'),
    firstName: Yup.string().required('Yêu cầu nhập họ người quản lý thương hiệu'),
    email: Yup.string().required('Yêu cầu nhập email của người quản lý thương hiệu').email()
  });

  const handleClickOpenBusinessManager = () => {
    // dispatch(getFieldList());
    setOpenBusinessManager(true);
  };

  const handleCloseBusinessManager = () => {
    setOpenBusinessManager(false);
    resetForm();
  };
  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { Authorization: `Bearer ${token}` };
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      businessId: business.id
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const headers = getHeaderFormData();

        await axios
          .post(
            `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users`,
            values,
            {
              headers: headers
            }
          )
          .then(async () => {
            dispatch(getBusinessById(business.id));
            resetForm();
            setSubmitting(true);
            enqueueSnackbar('Thêm mới người quản lý thành công', {
              variant: 'success'
            });
          })
          .catch(() => {
            enqueueSnackbar('Thêm mới thất bại vui lòng kiểm tra lại thông tin của bạn', {
              variant: 'error'
            });
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, resetForm, getFieldProps } = formik;
  return (
    <Page title="Chi tiết thương hiệu | Admin">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Chi tiết thương hiệu'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: business.name }]}
          action={
            <Grid container display={'flex'} gap={1}>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  startIcon={<Icon icon={editTwotone} />}
                  color={'warning'}
                >
                  Cập nhật thông tin
                </Button>
                <Dialog
                  open={open}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <FormikProvider value={formikProfile}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmitProfile}>
                      <DialogTitle>Cập nhật thông tin thương hiệu</DialogTitle>
                      <DialogContent>
                        <Box my={3}>
                          <DialogContentText>Điền thông tin bạn muốn cập nhật</DialogContentText>
                        </Box>
                        <Stack spacing={{ xs: 2, md: 3 }}>
                          <TextField
                            required
                            label="Tên thương hiệu"
                            fullWidth
                            variant="outlined"
                            {...getFieldPropsProfile('name')}
                            error={Boolean(touchedProfile.name && errorsProfile.name)}
                            helperText={touchedProfile.name && errorsProfile.name}
                          />
                          <TextField
                            required
                            label="Email thương hiệu"
                            fullWidth
                            variant="outlined"
                            {...getFieldPropsProfile('email')}
                            error={Boolean(touchedProfile.email && errorsProfile.email)}
                            helperText={touchedProfile.email && errorsProfile.email}
                          />
                          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            <TextField
                              required
                              label="Số điện thoại"
                              fullWidth
                              variant="outlined"
                              {...getFieldPropsProfile('phoneNum')}
                              error={Boolean(touchedProfile.phoneNum && errorsProfile.phoneNum)}
                              helperText={touchedProfile.phoneNum && errorsProfile.phoneNum}
                            />
                            <TextField
                              required
                              label="Mã doanh nghiệp"
                              fullWidth
                              variant="outlined"
                              {...getFieldPropsProfile('taxIdentificationNumber')}
                              error={Boolean(
                                touchedProfile.taxIdentificationNumber &&
                                  errorsProfile.taxIdentificationNumber
                              )}
                              helperText={
                                touchedProfile.taxIdentificationNumber &&
                                errorsProfile.taxIdentificationNumber
                              }
                            />
                          </Stack>
                          <TextField
                            required
                            label="Địa chỉ"
                            fullWidth
                            variant="outlined"
                            {...getFieldPropsProfile('address')}
                            error={Boolean(touchedProfile.address && errorsProfile.address)}
                            helperText={touchedProfile.address && errorsProfile.address}
                          />
                          <Stack spacing={3}>
                            <TextField
                              required
                              label="Mô tả"
                              multiline
                              minRows={5}
                              fullWidth
                              variant="outlined"
                              {...getFieldPropsProfile('description')}
                              error={Boolean(
                                touchedProfile.description && errorsProfile.description
                              )}
                              helperText={touchedProfile.description && errorsProfile.description}
                            />
                          </Stack>
                        </Stack>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={isSubmittingProfile}
                        >
                          Lưu
                        </LoadingButton>
                      </DialogActions>
                    </Form>
                  </FormikProvider>
                </Dialog>
              </Box>
              <Box>
                {business.status !== STATUS_BUSINESS && (
                  <Button
                    startIcon={<Icon icon={plusFill} width={16} height={16} />}
                    onClick={handleClickOpenBusinessManager}
                    size="medium"
                    variant="contained"
                  >
                    Thêm người quản lý thương hiệu
                  </Button>
                )}
                <Dialog
                  open={openBusinessManager}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <FormikProvider value={formik}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                      <DialogTitle>Thêm người quản lý thương hiệu</DialogTitle>
                      <DialogContent>
                        <Box my={3}>
                          <DialogContentText>
                            Điền thông tin người quản thương hiệu.
                          </DialogContentText>
                          <Typography variant="caption" color="#B78103">
                            * Những thông tin trống vui lòng điền "N/A".
                          </Typography>
                        </Box>
                        <Stack spacing={3}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <TextField
                              required
                              fullWidth
                              label="Họ"
                              {...getFieldProps('firstName')}
                              error={Boolean(touched.firstName && errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />
                            <TextField
                              required
                              fullWidth
                              label="Tên"
                              {...getFieldProps('lastName')}
                              error={Boolean(touched.lastName && errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                            <TextField
                              required
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Stack>
                        </Stack>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseBusinessManager}>Đóng</Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          Lưu
                        </LoadingButton>
                      </DialogActions>
                    </Form>
                  </FormikProvider>
                </Dialog>
              </Box>
            </Grid>
          }
        />

        <Card sx={{ p: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Box>
                    {business.status === STATUS_BUSINESS ? (
                      <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                        Thương hiệu này đã hoạt động
                      </Label>
                    ) : (
                      <Label color="warning" sx={{ textTransform: 'uppercase', mb: 1 }}>
                        Thương hiệu này chưa có người quản lý
                      </Label>
                    )}
                  </Box>
                  <TextField fullWidth disabled label="Tên thương hiệu" value={business.name} />

                  <TextField
                    fullWidth
                    disabled
                    label="Email"
                    value={business.email ?? '<Chưa cập nhật>'}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Hotline"
                    value={business.phoneNum ?? '<Chưa cập nhật>'}
                  />

                  <TextField
                    fullWidth
                    disabled
                    label="Địa chỉ"
                    value={business.address ?? '<Chưa cập nhật>'}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Mã số thuế"
                    value={business.taxIdentificationNumber ?? '<Chưa cập nhật>'}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    disabled
                    label="Mô tả"
                    value={business.description ?? '<Chưa cập nhật>'}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid
              display={'flex'}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              item
              xs={12}
              sm={6}
            >
              <Box my={3}>
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
                            setFieldValueImage('photoURL', business.image);
                          }}
                        >
                          Hủy
                        </Button>
                      </Box>
                    )}
                  </Form>
                </FormikProvider>
              </Box>
            </Grid>
          </Grid>
        </Card>
        {business.manager?.id && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3, mt: 3 }}>
                <Stack spacing={{ xs: 2, md: 3 }}></Stack>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Grid container>
                    <Grid md={3}>
                      <FormikProvider value={formikImageManager}>
                        <Form noValidate autoComplete="off" onSubmit={handleSubmitImageManager}>
                          <UploadAvatar
                            accept="image/*"
                            file={valuesImageManager.photoURL}
                            maxSize={3145728}
                            onDrop={handleDropManager}
                            sx={{ width: '200px', height: '200px' }}
                            error={Boolean(
                              touchedImageManager.photoURL && errorsImageManager.photoURL
                            )}
                          />
                          {fileUploadManager && (
                            <Box display="flex" my={3} justifyContent="space-evenly">
                              <LoadingButton
                                color="warning"
                                type="submit"
                                variant="contained"
                                loading={isSubmittingImageManager}
                              >
                                Lưu
                              </LoadingButton>
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => {
                                  setFileUploadManager(null);
                                  setFieldValueImageManager('photoURL', business.manager?.image);
                                }}
                              >
                                Hủy
                              </Button>
                            </Box>
                          )}
                        </Form>
                      </FormikProvider>
                    </Grid>
                    <Grid md={9} gap={1} spacing={2}>
                      <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography sx={{ fontWeight: '700' }}>
                          <Box>
                            {business?.status === STATUS_BUSINESS ? (
                              <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                                Thông tin cá nhân người quản lý thương hiệu
                              </Label>
                            ) : (
                              <Label color="warning" sx={{ textTransform: 'uppercase', mb: 1 }}>
                                Thương hiệu này chưa có người quản lý
                              </Label>
                            )}
                          </Box>
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            disabled
                            label="Họ và tên"
                            value={`${business.manager?.firstName} ${business.manager?.lastName}`}
                          />

                          <TextField
                            fullWidth
                            disabled
                            label="Email"
                            value={business.manager?.email}
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            disabled
                            label="Ngày sinh"
                            value={business.manager?.dateOfBirth ?? '<Chưa cập nhật>'}
                          />
                          <TextField
                            fullWidth
                            disabled
                            label="Giới tính"
                            value={business.manager?.gender ?? '<Chưa cập nhật>'}
                          />
                          <TextField
                            fullWidth
                            disabled
                            label="SĐT"
                            value={business.manager?.phoneNum ?? '<Chưa cập nhật>'}
                          />
                          <TextField
                            fullWidth
                            disabled
                            label="CMND/CCCD"
                            value={business.manager?.idCard ?? '<Chưa cập nhật>'}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
