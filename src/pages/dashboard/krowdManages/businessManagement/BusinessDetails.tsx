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
  TableContainer
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
import { getBusinessList, getBusinessListById } from 'redux/slices/krowd_slices/business';
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
  // const [hello, setData] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { Busid = '' } = useParams();

  const { activeBussinessId: business } = useSelector((state: RootState) => state.business);
  const { projectLists } = useSelector((state: RootState) => state.project);

  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId));
  };
  console.log('number', projectLists.numOfProject);
  console.log('projectLists', projectLists.listOfProject);
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
            { name: sentenceCase(Busid) }
          ]}
        />

        {/* <InvoiceToolbar invoice={INVOICE} /> */}
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
              Tổng dự án của công ty ( {projectLists?.listOfProject.length} )
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
                    <TableCell align="left">Ngày tạo</TableCell>
                    <TableCell align="left">duration</TableCell>
                    <TableCell align="right">numOfStage</TableCell>
                    <TableCell align="right">remainAmount</TableCell>
                    <TableCell align="right">Share</TableCell>
                    <TableCell align="center">Ngày bắt đầu</TableCell>
                    <TableCell align="center">Ngày kết thúc</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {projectLists.listOfProject?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 600 }}>
                          <Typography variant="subtitle2">{row?.name}</Typography>
                          {/* <Typography variant="body2">{row.image}</Typography> */}
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle2"> {row?.createDate}</Typography>
                      </TableCell>

                      {/* <TableCell align="left">
                        <Typography variant="subtitle2">{row.createBy}</Typography>
                      </TableCell> */}

                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.duration}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.numOfStage}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.remainAmount}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.sharedRevenue}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{row.startDate}</TableCell>
                      <TableCell align="left">{row.endDate}</TableCell>
                      <ProjectMoreMenu
                        onView={() => handleGetProjectById(row.id)}
                        onDelete={() => handleDeleteProjectById(row.id)}
                      />
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
