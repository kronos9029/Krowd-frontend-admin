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
    <Page title="Giao dịch: ngân hàng  | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Giao dịch ngân hàng"
          links={[
            { name: 'Giao dịch', href: PATH_DASHBOARD.transaction.root },
            { name: sentenceCase(Busid) }
          ]}
        />

        <Card sx={{ pt: 5 }}>
          <Scrollbar>
            <Typography paragraph variant="h6" sx={{ pl: 3 }}>
              Các giao dịch{' '}
            </Typography>
            <TableContainer sx={{ minWidth: 760 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
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
                      <TableCell align="left">
                        <Typography variant="body2" noWrap>
                          {row?.fromUserId}{' '}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.toUserId}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.createDate}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.createBy}</TableCell>
                      {/* <TableCell align="right">{row.status}</TableCell> */}
                      <TableCell align="right">
                        {' '}
                        <InvoiceToolbar invoice={row} />
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
