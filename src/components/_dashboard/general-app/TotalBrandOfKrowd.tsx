import { Card, Typography, Grid, Box } from '@mui/material';
// utils
import { dispatch, RootState, useSelector } from 'redux/store';
import { useEffect } from 'react';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import LoadingScreen from 'components/LoadingScreen';
// ----------------------------------------------------------------------
export default function TotalBrandOfKrowd() {
  const { businessState } = useSelector((state: RootState) => state.business);
  const { businessLists, isLoading } = businessState;
  const { listOfBusiness } = businessLists;
  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);
  return (
    <Card>
      <Typography sx={{ my: 5, p: 2 }} variant="h4">
        Các thương hiệu tham gia KrowdEco
      </Typography>

      {isLoading ? (
        <Box sx={{ pt: 7 }}>
          <LoadingScreen />
          <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem', pt: 7 }}>
            KROWD đang tải dữ liệu, vui lòng đợi giây lát...
          </Typography>
        </Box>
      ) : (
        <Grid container sx={{ my: 5 }}>
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
      )}
    </Card>
  );
}
