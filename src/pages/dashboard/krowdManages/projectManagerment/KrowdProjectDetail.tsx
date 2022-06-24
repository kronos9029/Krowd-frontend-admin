import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../../../redux/slices/template_slice/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { CartItem, ProductState } from '../../../../@types/products';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Markdown from '../../../../components/Markdown';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import {
  ProjecrDetailsSummary,
  ProjectDetailsReview,
  ProjectDetailsCarousel
} from '../../../../components/_dashboard/e-commerce/product-details';
import CartWidget from '../../../../components/_dashboard/e-commerce/CartWidget';
import { BookingBookedRoom } from 'components/_dashboard/general-booking';
import {
  AnalyticsBugReports,
  AnalyticsItemOrders,
  AnalyticsNewUsers,
  AnalyticsWeeklySales
} from 'components/_dashboard/general-analytics';
import { BlogPostHero } from 'components/_dashboard/blog';
import { BlogState } from '../../../../@types/blog';
import { Project, ProjectState } from '../../../../@types/krowd/project';
import { getProjectId } from 'redux/slices/krowd_slices/project';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function KrowdProjectDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  // const { product, error, checkout } = useSelector(
  //   (state: { product: ProductState }) => state.product
  // );
  // const { project, error } = useSelector((state: { projectId: ProjectState }) => state.projectId);
  // console.log('aaaaaaa 1', error);

  const { activeProjectId: project } = useSelector((state: RootState) => {
    return state.project;
  });
  console.log('aaaaa', project);

  // const handleGotoStep = (step: number) => {
  //   dispatch(onGotoStep(step));
  // };

  return (
    <Page title="Dự án: Chi tiết dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết dự án"
          links={[
            { name: 'Danh sách', href: PATH_DASHBOARD.projects.projectKrowd },
            { name: sentenceCase(name) }
          ]}
        />

        {/* <CartWidget /> */}
        {project && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProjectDetailsCarousel product={product} /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProjecrDetailsSummary product={project} />
                </Grid>
              </Grid>
            </Card>
            <BookingBookedRoom />
            <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsWeeklySales />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsNewUsers />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsItemOrders />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsBugReports />
              </Grid>
            </Grid>
            {/* Nổi bật */}
            <Typography variant="subtitle1" sx={{ ml: 1, fontSize: '20px', mb: 5 }}>
              Nổi bật
            </Typography>
            <img src="/static/mock-images/covers/cover_1.jpg" />
            {/*Change tab view at here */}
            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab
                      sx={{ paddingRight: '1rem' }}
                      disableRipple
                      value="1"
                      label="Mô tả chi tiết"
                    />
                    <Tab
                      disableRipple
                      value="2"
                      label="Thành viên"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
                    />
                    <Tab
                      disableRipple
                      value="3"
                      label="Giai đoạn"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={project.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">{/* <ProjectDetailsReview product={product} /> */}</TabPanel>
                <TabPanel value="3">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={project.description} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!project && SkeletonLoad}

        {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
