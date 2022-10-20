// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  KrowdArticle,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  TotalProjectPublished,
  TotalBrandOfKrowd,
  AppTopInstalledCountries
} from '../../../components/_dashboard/general-app';
import { RootState, useSelector } from 'redux/store';
// ----------------------------------------------------------------------

export default function KrowdAdminDashboard() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { userKrowdDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { userKrowdDetail, isLoading } = userKrowdDetailState;
  return (
    <Page title="Trang chủ: Admin | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome user={user} admin={userKrowdDetail} />
          </Grid>

          <Grid item xs={12} md={4}>
            <KrowdArticle />
          </Grid>

          <Grid item xs={12} md={12}>
            <TotalBrandOfKrowd />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TotalProjectPublished />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid> */}

          {/* <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidgets1 />
              <AppWidgets2 />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
