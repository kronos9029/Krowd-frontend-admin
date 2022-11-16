// material
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  CircularProgress,
  Avatar,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Dialog
} from '@mui/material';
// routes
// hooks
import * as Yup from 'yup';
// components
import { UserKrowd } from '../../../@types/krowd/users';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
import Label from 'components/Label';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { dispatch } from 'redux/store';
import { deleteUser } from 'redux/slices/krowd_slices/users';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ----------------------------------------------------------------------
type UserKrowdDetailsProps = {
  currentKrowd: UserKrowd;
  isLoading: boolean;
};
type BusinessManagerDetailProps = {
  businessManager: UserKrowd;
  isLoading: boolean;
};
export default function UserKrowdDetailView({
  currentKrowd: user,
  isLoading
}: UserKrowdDetailsProps) {
  return <BusinessManagerDetail businessManager={user} isLoading={isLoading} />;
}
function BusinessManagerDetail({ businessManager: bm, isLoading }: BusinessManagerDetailProps) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const EditBusinessManagerSchema = Yup.object().shape({
    email: Yup.string().required('Yêu cầu nhập email').email('Email của bạn chưa hợp lệ')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: bm?.email
    },
    validationSchema: EditBusinessManagerSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(true);
        const bodyFormData = new FormData();
        bodyFormData.append('email', values.email);
        await axios({
          method: 'put',
          url: `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users/${bm.id}`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((res) => {
            enqueueSnackbar('Sửa đổi thành công', {
              variant: 'success'
            });
          })
          .catch((e) => {
            enqueueSnackbar('Sửa đổi thất bại', {
              variant: 'error'
            });
          });
        resetForm();
        handleClose();
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteUser = (userID: string) => {
    dispatch(deleteUser(userID)).then(() => {
      enqueueSnackbar('Xóa người quản lý thành công', {
        variant: 'success'
      });
      navigate(PATH_DASHBOARD.admin.listBusiness, { replace: true });
    });
  };
  return (
    <Page title="Chi tiết doanh nghiệp | Krowd">
      <Container maxWidth={'md'}>
        <HeaderBreadcrumbs
          heading={'Chi tiết doanh nghiệp'}
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            {
              name: 'Danh sách',
              href: PATH_DASHBOARD.admin.listBusiness
            },
            { name: `${bm.firstName} ${bm.lastName}` }
          ]}
          action={
            <>
              <Box display="flex" justifyContent="space-evenly" width={300}>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  startIcon={<Icon icon={editTwotone} />}
                  color={'warning'}
                >
                  Cập nhật email
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <FormikProvider value={formik}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                      <DialogTitle>Cập nhật email</DialogTitle>
                      <DialogContent>
                        <Box my={3}>
                          <DialogContentText>
                            Hành động này ảnh hưởng đến người quản lý doanh nghiệp, chỉ thay đổi khi
                            có yêu cầu của họ.
                          </DialogContentText>
                        </Box>
                        <TextField
                          autoFocus
                          label="Email"
                          fullWidth
                          variant="outlined"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          Lưu
                        </LoadingButton>
                      </DialogActions>
                    </Form>
                  </FormikProvider>
                </Dialog>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteUser(bm.id)}
                  startIcon={<Icon icon={trash2Outline} />}
                  color={'error'}
                >
                  Xóa
                </Button>
              </Box>
            </>
          }
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
          <Card sx={{ p: 5 }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                    {bm.status}
                  </Label>
                </Box>
                <Box>
                  <Typography paragraph variant="h6">
                    {`${bm.firstName} ${bm.lastName}`}
                  </Typography>
                  <Typography paragraph>Email: {bm.email ?? '<Chưa cập nhật>'}</Typography>
                  <Typography paragraph>Địa chỉ: {bm.address ?? '<Chưa cập nhật>'}</Typography>
                  <Typography paragraph>Hotline: {bm.phoneNum ?? '<Chưa cập nhật>'}</Typography>
                  <Typography paragraph>Mô tả: {bm.description ?? '<Chưa cập nhật>'}</Typography>
                  <Typography paragraph>
                    Mã số thuế: {bm.taxIdentificationNumber ?? '<Chưa cập nhật>'}
                  </Typography>
                </Box>
              </Grid>
              <Grid display={'flex'} justifyContent="end" alignItems="center" item xs={12} sm={6}>
                <Box>
                  <Avatar
                    alt="logo"
                    src={bm.image}
                    sx={{ width: 200, height: 200, objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </Container>
    </Page>
  );
}
