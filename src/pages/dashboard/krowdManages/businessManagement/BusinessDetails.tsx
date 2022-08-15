// material
import { Box, Grid, Card, Divider, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { dispatch, RootState, useSelector } from 'redux/store';
import { useParams } from 'react-router';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { getBusinessById } from 'redux/slices/krowd_slices/business';
import ProjectsOfBusinessTable from 'components/table/ProjectsOfBusinessTable';
import { Business } from '../../../../@types/krowd/business';

// ----------------------------------------------------------------------
type BusinessDetails = {
  currentBusiness: Business;
};
export default function BusinessDetails({ currentBusiness: business }: BusinessDetails) {
  return (
    <Page title="Doanh nghiệp: Tạo mới | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Chi tiết doanh nghiệp'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: business.name }]}
        />
        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box component="img" alt="logo" src={business?.image} sx={{ height: 48 }} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  {business?.status}
                </Label>
                <Typography variant="h6">
                  Mã số thuế: {business?.taxIdentificationNumber}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5} sx={{ mb: 7, pt: 5, pr: 3 }}>
              <Typography paragraph variant="h6">
                {business?.name}
              </Typography>
              <Typography paragraph sx={{ pt: 1, pb: 1 }}>
                Email: {business?.email}
              </Typography>
              <Typography paragraph sx={{ pt: 1, pb: 1 }}>
                Địa chỉ: {business?.address}
              </Typography>
              <Typography paragraph>HotLine: {business?.phoneNum}</Typography>
            </Grid>

            <Grid item xs={12} sm={7} sx={{ mb: 7, pt: 5, pl: 3 }}>
              <Typography paragraph variant="h6">
                Mô tả
              </Typography>
              <Typography paragraph>{business?.description}</Typography>
            </Grid>
          </Grid>

          <ProjectsOfBusinessTable
            id={business.id}
            businessName={business?.name ?? 'doanh nghiệp'}
          />

          <Divider sx={{ mt: 5 }} />
        </Card>
      </Container>
    </Page>
  );
}
