import { useState, useEffect, useCallback } from 'react';
// material
import {
  Container,
  Box,
  CircularProgress,
  Typography,
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
import { useParams } from 'react-router';
import Label from 'components/Label';
import { getUserKrowdDetail, getWalletTransactionList } from 'redux/slices/krowd_slices/users';
import { UserKrowd } from '../../../../@types/krowd/users';
import WalletInvestorTransactionTable from './WalletInvestorTransactionTable';
import { borderRadius, styled } from '@mui/system';

// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  width: 300,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(2)
  }
}));
const STATUS_investor = 'ACTIVE';
export default function AdminInvestorDetail() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();

  const { userKrowdDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { isLoading, userKrowdDetail } = userKrowdDetailState;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getUserKrowdDetail(id));
    dispatch(getWalletTransactionList(id, pageIndex, 5));
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
        (userKrowdDetail && <InvestorDetails investor={userKrowdDetail} />)}
    </Page>
  );
}

type investorManagerProps = {
  investor: UserKrowd;
};
function InvestorDetails({ investor }: investorManagerProps) {
  return (
    <Page title="Chi tiết nhà đầu tư | Admin">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Chi tiết quản lý nhà đầu tư'}
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: `${investor.firstName} ${investor.lastName}` }
          ]}
        />

        <Grid container sx={{ p: 5 }}>
          <Grid item xs={12} md={3} sm={3} lg={3}>
            <Box>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Box>
                  <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                    Thông tin
                  </Label>
                </Box>
                <RootStyle>
                  <Grid sx={{ mt: 1, my: 1 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography
                        variant="overline"
                        sx={{
                          display: 'flex',
                          color: 'text.secondary',
                          justifyContent: 'center',
                          pb: 2
                        }}
                      >
                        Nhà đầu tư
                      </Typography>
                      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography variant="h3" sx={{ mx: 1 }}></Typography>
                        </Box> */}

                      <Typography
                        variant="body1"
                        sx={{
                          color: 'primary.main',
                          display: 'flex',
                          height: '150px',
                          mx: 8,
                          width: '150px'
                        }}
                      >
                        {investor?.image !== null ? (
                          <img style={{ borderRadius: '50%' }} alt="lala" src={investor?.image} />
                        ) : (
                          <img alt="Chưa cập nhật" src="/static/icons/navbar/AvatarInvestor.jpg" />
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: 'capitalize',
                          justifyContent: 'center',
                          display: 'flex'
                        }}
                      >
                        {investor?.firstName} {investor?.lastName ?? 'Chưa cập nhật'}{' '}
                      </Typography>
                      <Stack
                        paddingLeft={0}
                        textAlign={'left'}
                        component="ul"
                        sx={{ my: 1, width: 1 }}
                      >
                        <Stack
                          component="li"
                          direction="row"
                          alignItems="center"
                          sx={{
                            typography: 'body2',
                            p: 1
                          }}
                        >
                          <Typography variant="body2">
                            Email: {investor?.email ?? 'Chưa cập nhật'}
                          </Typography>
                        </Stack>
                        <Stack
                          component="li"
                          direction="row"
                          alignItems="center"
                          sx={{
                            typography: 'body2',
                            p: 1
                          }}
                        >
                          <Typography variant="body2">
                            Số điện thoại: {investor?.phoneNum ?? 'Chưa cập nhật'}
                          </Typography>
                        </Stack>
                        <Stack
                          component="li"
                          direction="row"
                          alignItems="center"
                          sx={{
                            typography: 'body2',
                            p: 1
                          }}
                        >
                          <Typography variant="body2">
                            Địa chỉ: {investor?.address ?? 'Chưa cập nhật'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </RootStyle>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Box>
                  <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                    Lịch sử giao dịch
                  </Label>
                </Box>
                <WalletInvestorTransactionTable />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
