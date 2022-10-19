import { Icon } from '@iconify/react';
import { ApexOptions } from 'apexcharts';

import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack, Grid } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
import { dispatch, RootState, useSelector } from 'redux/store';
import { useEffect } from 'react';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import BusinessTable from 'components/table/BusinessTable';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

export default function AppTotalActiveUsers() {
  const theme = useTheme();
  const { businessState } = useSelector((state: RootState) => state.business);
  const { businessLists, isLoading } = businessState;
  const { listOfBusiness } = businessLists;
  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);
  return (
    <>
      <Typography sx={{ my: 5, p: 2 }} variant="h4">
        Các doanh nghiệp đang hợp tác cùng KROWD
      </Typography>

      <Grid container>
        {listOfBusiness &&
          listOfBusiness.length > 0 &&
          listOfBusiness.map((e, index) => (
            <Grid sx={{ p: 2 }} item key={index} xs={2} sm={2} md={2} lg={2}>
              <Typography>
                {e.image && <img style={{ width: 150, height: 150 }} src={e.image} />}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
