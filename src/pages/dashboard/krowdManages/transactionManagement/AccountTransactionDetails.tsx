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
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { dispatch, RootState, useSelector } from 'redux/store';
import { useParams } from 'react-router';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { getAccountTransactionList } from 'redux/slices/krowd_slices/transaction';
import { InvoiceToolbar } from 'components/_dashboard/e-commerce/invoice';

// ----------------------------------------------------------------------

export default function AccountTransactionDetails() {
  const { themeStretch } = useSettings();
  // const [hello, setData] = useState();

  const { Busid = '' } = useParams();

  useEffect(() => {
    dispatch(getAccountTransactionList());
  }, [dispatch]);
  const { accountTransactionList: AccountList } = useSelector(
    (state: RootState) => state.transaction
  );

  return (
    <Page title="Giao dịch: Giữa các ví  | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Giao dịch các ví"
          links={[
            { name: 'Doanh nghiệp', href: PATH_DASHBOARD.transaction.root },
            { name: sentenceCase(Busid) }
          ]}
        />

        <Card sx={{ pt: 5, px: 5 }}>
          <Scrollbar>
            <Typography paragraph variant="h6">
              Các giao dịch{' '}
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
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Người gửi</TableCell>
                    <TableCell align="left">Người nhận</TableCell>
                    <TableCell align="left">Mô tả</TableCell>
                    <TableCell align="center">Ngày tạo</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {AccountList?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <InvoiceToolbar invoice={row} key={index} />
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{row?.fromUserId}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.toUserId}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">{row.createDate}</TableCell>
                      <TableCell align="right">{row.createBy}</TableCell>
                      {/* <TableCell align="right">{row.status}</TableCell> */}
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
