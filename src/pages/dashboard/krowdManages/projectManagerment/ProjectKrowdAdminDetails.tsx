import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography
} from '@mui/material';
import { fCurrency } from 'utils/formatNumber';
// import { ProjectDetailAlbumCarousel } from 'components/_external-pages/project-detail/index';
import { PATH_DASHBOARD } from 'routes/paths';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { dispatch, RootState, useSelector } from 'redux/store';
import { approveProject, getProjectId } from 'redux/slices/krowd_slices/project';
import Page from 'components/Page';
import { Container } from '@mui/system';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { useSnackbar } from 'notistack';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#14B7CC'
  }
}));

export default function ProjectKrowdAdminDetails() {
  const { id = '' } = useParams();
  const { projectDetail: project } = useSelector((state: RootState) => state.project);
  useEffect(() => {
    dispatch(getProjectId(id));
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };
  const handleSubmitProject = () => {
    dispatch(approveProject(id));
    enqueueSnackbar('Duyệt thành công', {
      variant: 'success'
    });
    setOpenSubmit(false);
  };
  return (
    <Page title="Chi tiết: Dự án | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Chi tiết Dự án"
          links={[
            { name: 'Dự án', href: PATH_DASHBOARD.projects.projectKrowd },
            { name: `${project?.name}` }
          ]}
          action={
            <Box>
              {project?.status === 'WAITING_FOR_APPROVAL' && (
                <>
                  <Button variant="contained" onClick={handleClickOpen} color={'error'}>
                    Từ chối
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClickOpenSubmit}
                    startIcon={<Icon icon={checkmarkFill} />}
                    color={'primary'}
                    sx={{ ml: 1 }}
                  >
                    Duyệt dự án{' '}
                  </Button>
                  <Dialog
                    open={openSubmit}
                    onClose={handleClickOpenSubmit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <DialogTitle>Bạn có muốn duyệt dự án</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseSubmit}>Đóng</Button>
                      <Button type="submit" variant="contained" onClick={handleSubmitProject}>
                        Lưu
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Box>
          }
        />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Thông tin chung:
        </Typography>
        <Grid container>
          <Grid
            px={{ lg: 0, md: 0, sm: 5, xs: 2 }}
            sx={{ pr: 5 }}
            py={{ lg: 0, md: 3, sm: 3 }}
            item
            xs={12}
            sm={12}
            md={7}
            lg={8}
          >
            <img style={{ width: '100%' }} src={project?.image} />

            {/* {album && <ProjectDetailAlbumCarousel album={album} />} */}
          </Grid>
          <Grid
            px={{ lg: 5, md: 5, sm: 5, xs: 2 }}
            py={{ lg: 5, md: 3, sm: 3, xs: 3 }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={4}
          >
            <Box sx={{ my: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Đã đầu tư</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Mục tiêu</strong>
                </Typography>
              </Box>
              <BorderLinearProgress
                variant="determinate"
                value={
                  (project &&
                    (project?.investedCapital / project?.investmentTargetCapital) * 100) ??
                  0
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  my: '0.5rem'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#14B7CC'
                  }}
                >
                  <strong>{fCurrency(`${project?.investedCapital}`)}</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#FF7F56'
                  }}
                >
                  <strong> {fCurrency(`${project?.investmentTargetCapital}`)}</strong>
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.sharedRevenue}
                <span>%</span>
                <Typography color="text.disabled" variant="subtitle2">
                  Doanh thu chia sẻ
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                <span>x</span>
                {project?.multiplier}
                <Typography color="text.disabled" variant="subtitle2">
                  Hệ số nhân
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.duration} <span> tháng </span>
                <Typography color="text.disabled" variant="subtitle2">
                  Thanh toán đầu tư
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.numOfStage} <span> kì</span>
                <Typography color="text.disabled" variant="subtitle2">
                  Số kì thanh toán
                </Typography>
              </Typography>
            </Box>
          </Grid>

          {/* <Typography variant="h4" sx={{ my: 5 }}>
            Album ảnh của dự án:
          </Typography>
          <Grid
            px={{ lg: 0, md: 0, sm: 5, xs: 2 }}
            sx={{ pr: 5 }}
            py={{ lg: 0, md: 3, sm: 3 }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            {album && <ProjectDetailAlbumCarousel album={album} />}
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
