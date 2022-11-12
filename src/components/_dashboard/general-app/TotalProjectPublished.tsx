import { Box, Card, Grid, Typography } from '@mui/material';
import LoadingScreen from 'components/LoadingScreen';
import ProjectCardAdmin from 'components/table/krowd-table/ProjectCardAdmin';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllCallingProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------

export default function TotalProjectPublished() {
  const { listCallingProject, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list } = listCallingProject;
  const { status = 'CALLING_FOR_INVESTMENT' } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getAllCallingProject(status, pageIndex, 3, ''));
  }, [dispatch]);
  return (
    <>
      <Typography sx={{ my: 5, p: 2 }} variant="h4">
        Dự án được đăng lên trang chủ gần đây
      </Typography>
      {isLoading ? (
        <Box sx={{ pt: 7 }}>
          <LoadingScreen />
          <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem', pt: 7 }}>
            KROWD đang tải dữ liệu, vui lòng đợi giây lát...
          </Typography>
        </Box>
      ) : (
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {list.slice(0, 9).map((p) => (
            <ProjectCardAdmin key={p.id} row={p} />
          ))}
        </Grid>
      )}
    </>
  );
}
