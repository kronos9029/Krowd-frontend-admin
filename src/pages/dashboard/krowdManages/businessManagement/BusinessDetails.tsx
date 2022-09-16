import { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';
// redux
import { dispatch, RootState, useDispatch, useSelector } from 'redux/store';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import {
  approveBusiness,
  deniedBusiness,
  getBusinessById
} from 'redux/slices/krowd_slices/business';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { Business } from '../../../../@types/krowd/business';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import Label from 'components/Label';

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
    <Page title="Doanh nghiệp| Krowd dành cho doanh nghiệp">
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
  const navigate = useNavigate();
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openDenied, setOpenDenied] = useState(false);
  const handleSubmitBusiness = () => {
    dispatch(approveBusiness(business.id));
    enqueueSnackbar('Duyệt thành công', {
      variant: 'success'
    });
    setOpenSubmit(false);
  };
  const handleDeniedProject = () => {
    dispatch(deniedBusiness(business.id));
    enqueueSnackbar('Không duyệt doanh nghiệp này', {
      variant: 'error'
    });
    setOpenSubmit(false);
  };
  const handleClickOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };
  const handleClickOpenDenied = () => {
    setOpenDenied(true);
  };
  const handleCloseDenied = () => {
    setOpenDenied(false);
  };
  return (
    <Page title="Chi tiết quản lý doanh nghiệp | Admin">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Chi tiết quản lý doanh nghiệp'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: business.name }]}
          action={
            <Box>
              {business.status !== STATUS_BUSINESS && (
                <>
                  <Button variant="contained" onClick={handleClickOpenSubmit} color={'primary'}>
                    Duyệt doanh nghiệp
                  </Button>
                  <Dialog
                    open={openSubmit}
                    onClose={handleCloseSubmit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <DialogTitle>Bạn có muốn duyệt doanh nghiệp này?</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseSubmit}>Hủy</Button>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={handleSubmitBusiness}
                      >
                        Duyệt
                      </LoadingButton>
                    </DialogActions>
                  </Dialog>
                  <Button variant="contained" color={'error'} onClick={handleClickOpenDenied}>
                    Từ chối
                  </Button>
                  <Dialog
                    open={openDenied}
                    onClose={handleCloseDenied}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <DialogTitle>Bạn không duyệt doanh nghiệp này?</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseDenied}>Hủy</Button>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={handleDeniedProject}
                      >
                        Không duyệt
                      </LoadingButton>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Box>
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
                        Doanh nghiệp này đã duyệt
                      </Label>
                    ) : (
                      <Label color="warning" sx={{ textTransform: 'uppercase', mb: 1 }}>
                        Doanh nghiệp này chưa duyệt
                      </Label>
                    )}
                  </Box>
                  <TextField fullWidth disabled label="Tên doanh nghiệp" value={business.name} />

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
              mt={2}
            >
              <img src={business.image} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
