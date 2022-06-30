// material
import {
  Box,
  Grid,
  Card,
  Divider,
  Container,
  Typography,
  Button,
  Tooltip,
  Icon
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { RootState, useSelector } from 'redux/store';
import { useParams } from 'react-router';
import { sentenceCase } from 'change-case';
import { alpha, styled } from '@mui/material/styles';

import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { MIconButton } from 'components/@material-extend';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));
export default function ProjectKrowdAdminDetails() {
  const { themeStretch } = useSettings();
  // const [hello, setData] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { activeProjectId: project } = useSelector((state: RootState) => state.project);

  return (
    <Page title="Chi tiết: Dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết Dự án"
          links={[
            { name: 'Dự án', href: PATH_DASHBOARD.projects.projectKrowd },
            { name: `${project?.name}` }
          ]}
        />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={5} sx={{ mb: 5, pr: 5 }}>
              <img alt="logo" src={project?.image} />
            </Grid>
            <Grid item xs={12} sm={7} sx={{ mb: 5 }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Doanh thu chia sẻ
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: '27px', color: '#19c157', fontWeight: 'boild' }}
                >
                  {project?.sharedRevenue} (%)
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Thành viên đã tham gia
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.multiplier} (Thành viên)
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Hệ số nhân
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.multiplier}x
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Thời hạn
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '27px' }}>
                  {project?.duration} (tháng)
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box sx={{ textAlign: { sm: 'right' }, mb: 3, mt: 3 }}>
                {/* <Label color="success" sx={{ textTransform: 'uppercase', mb: 2 }}>
                  {project?.status}
                </Label> */}
                <Typography variant="subtitle1">
                  Giấy phép kinh doanh: {project?.businessLicense}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Tên doanh nghiệp
                </Typography>
                {project?.business.name}
              </Box>

              <Box
                sx={{
                  my: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Khu vực
                </Typography>
                {project?.areaId}
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Địa chỉ:
                </Typography>
                {project?.address}
              </Box>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box sx={{ mt: 5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      size="large"
                      type="button"
                      variant="contained"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Duyệt dự án
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button fullWidth size="large" color="error" variant="contained">
                      TỪ chối
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Typography variant="subtitle1" sx={{ ml: 1, fontSize: '20px', mb: 5 }}>
              Nổi bật
            </Typography>
            <img src="/static/mock-images/covers/cover_1.jpg" />
            {/* <Grid item xs={12} sm={5} sx={{ mb: 7, pt: 5, pr: 3 }}>
              <Typography paragraph variant="h6">
                {project?.name}
              </Typography>
              <Typography paragraph sx={{ pt: 1, pb: 1 }}>
                Doanh nghiêp: {project?.businessId}
              </Typography>
              <Typography paragraph sx={{ pt: 1, pb: 1 }}>
                Địa chỉ: {project?.address}
              </Typography>
              <Typography paragraph>Khu vực: {project?.areaId}</Typography>
            </Grid>

            <Grid item xs={12} sm={7} sx={{ mb: 7, pt: 5, pl: 3 }}>
              <Typography paragraph variant="h6">
                Mô tả
              </Typography>
              <Typography paragraph>{project?.description}</Typography>
            </Grid>
          </Grid> */}
          </Grid>

          <Divider sx={{ mt: 5 }} />
        </Card>
      </Container>
    </Page>
  );
}
