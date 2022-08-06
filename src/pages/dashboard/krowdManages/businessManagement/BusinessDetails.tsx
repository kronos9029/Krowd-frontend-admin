// material
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Button
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { dispatch, RootState, useSelector } from 'redux/store';
import { useParams } from 'react-router';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import {
  getBusinessList,
  getBusinessById,
  getProjectByBusinessID
} from 'redux/slices/krowd_slices/business';
import { fDate } from 'utils/formatTime';
import { MIconButton } from 'components/@material-extend';
import {
  delProjectListById,
  getProjectId,
  getProjectListById
} from 'redux/slices/krowd_slices/project';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
import ProjectMoreMenu from 'components/_dashboard/e-commerce/projectKrowd/ProjectMoreMenu';

// ----------------------------------------------------------------------

export default function BusinessDetails() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id = '' } = useParams();

  const { businessDetailState } = useSelector((state: RootState) => state.business);
  const { businessDetail: business } = businessDetailState;
  const { projectLists } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(getBusinessById(id));
    dispatch(getProjectByBusinessID(id, 'ADMIN'));
  }, [dispatch]);

  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId));
  };
  const handleDeleteProjectById = (activeProjectId: string) => {
    dispatch(delProjectListById(activeProjectId));
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  // const businessListId2 = useSelector((state: RootState) => business(state));
  // const { activeBussinessId } = useSelector((state: RootState) => state.business.activeBussinessId);
  // console.log('value Object', Object.values(businessId));
  // console.log('projectOfBusiness at 1', Object.values(businessId).at(1));
  // console.log('mST-array', projectLists.businessId);
  return (
    <Page title="Chi tiết: Doanh nghiệp | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết doanh nghiệp"
          links={[
            { name: 'Doanh nghiệp', href: PATH_DASHBOARD.business.list },
            { name: sentenceCase(id) }
          ]}
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

          <Scrollbar>
            <Typography paragraph variant="h6">
              Tổng dự án của công ty ( {projectLists?.numOfProject} )
            </Typography>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell align="left">Tên dự án</TableCell>
                    <TableCell align="left">Thời hạn</TableCell>
                    <TableCell sx={{ maxWidth: 70 }} align="left">
                      Số kỳ
                    </TableCell>
                    <TableCell align="center">Đã đầu tư</TableCell>
                    <TableCell align="right">Mục tiêu</TableCell>
                    <TableCell align="center">Ngày bắt đầu</TableCell>
                    <TableCell align="center">Ngày kết thúc</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {projectLists.listOfProject.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <TableCell align="left">
                        <Box sx={{ minWidth: 200 }}>
                          <Typography variant="subtitle2">{row?.name}</Typography>
                          {/* <Typography variant="body2">{row.image}</Typography> */}
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Typography sx={{ color: 'text.secondary' }} noWrap>
                          {row.duration} tháng
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ color: 'text.secondary' }} noWrap>
                          {row.numOfStage} tháng
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.investedCapital}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.investmentTargetCapital}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.startDate}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.endDate}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <ProjectMoreMenu
                          onView={() => handleGetProjectById(row.id)}
                          onDelete={() => handleDeleteProjectById(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />
        </Card>
      </Container>
    </Page>
  );
}
