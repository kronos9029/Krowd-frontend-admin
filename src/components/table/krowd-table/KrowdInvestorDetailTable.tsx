import React from 'react';
import { useState } from 'react';
import {
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  CircularProgress,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Scrollbar from 'components/Scrollbar';
import { PATH_DASHBOARD } from 'routes/paths';
import { Link, Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import KrowdTableListHead from '../components/KrowdTableListHead';
import { fDate, fDateTimeSuffix } from 'utils/formatTime';
import { fCurrency } from 'utils/formatNumber';
import eyeFill from '@iconify/icons-eva/eye-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
export enum DATA_TYPE {
  TEXT = 'text',
  CHIP_TEXT = 'chip_text',
  IMAGE = 'image',
  LIST_TEXT = 'list_text',
  NUMBER = 'number',
  WRAP_TEXT = 'wrap_text',
  DATE = 'date',
  CURRENCY = 'currency',
  NUMBER_FORMAT = 'number_format',
  LABLE = 'lable',
  TEXT_FORMAT = 'text_format'
}
export type RowData = {
  id: string;
  items: {
    name: string;
    value: any;
    type: DATA_TYPE;
    textColor?: string;
    textMapColor?: { status: string; color: string }[];
  }[];
};
export type KrowdTableProps = {
  headingTitle: string;
  createNewRecordButton?: { pathTo: string; label: string };
  header: { id: string; label: string; align: string }[];
  getData: () => Array<RowData>;
  viewPath?: string;
  action?: React.ReactNode;
  deleteRecord?: (id: string) => void;
  isLoading: boolean;
};

export function KrowdInvestorDetailTable({
  headingTitle,
  createNewRecordButton,
  header,
  getData,
  action,
  isLoading,
  viewPath,
  deleteRecord
}: KrowdTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const data = getData();
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const dataInPage: RowData[] =
    data && data.length > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

  return (
    <>
      {/* <HeaderBreadcrumbs heading={``} links={[{}]} action={action} /> */}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <KrowdTableListHead
              headLabel={[
                { id: '__borderHeaderLeft', label: '', align: 'center' },
                ...header,
                { id: '__borderHeaderRight', label: '', align: 'center' }
              ]}
            />
            <TableBody>
              {!isLoading &&
                dataInPage.length > 0 &&
                dataInPage.map((data, index) => {
                  return (
                    <TableRow hover key={`__${data.id}`} tabIndex={-1} role="checkbox">
                      <TableCell
                        key={'__borderRowLeft'}
                        component="th"
                        scope="row"
                        padding="normal"
                        align="justify"
                        sx={{ bgcolor: '#ffffff' }}
                      ></TableCell>
                      {data.items.map((_item) => {
                        switch (_item.type) {
                          case DATA_TYPE.TEXT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    color={_item.textColor ?? 'text.primary'}
                                  >
                                    {_item.value}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.TEXT_FORMAT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack
                                  display={'flex'}
                                  direction="row"
                                  justifyContent={'center'}
                                  spacing={2}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    color={_item.textColor ?? 'text.primary'}
                                  >
                                    {_item.value}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.CURRENCY:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ color: _item.textColor ?? 'text.primary' }}
                                  >
                                    {fCurrency(_item.value)}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.WRAP_TEXT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2">{_item.value}</Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.NUMBER:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    mx="auto"
                                    color={_item.textColor ?? 'text.primary'}
                                  >
                                    {_item.value}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.DATE:
                            const date = String(_item.value).split(' ')[0];
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {date}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.IMAGE:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={`__${_item.name}__${data.id}`} src={_item.value} />
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.NUMBER_FORMAT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack
                                  display={'block'}
                                  direction="row"
                                  alignItems="right"
                                  spacing={2}
                                >
                                  <Typography
                                    sx={{ textAlign: 'right' }}
                                    variant="subtitle2"
                                    noWrap
                                    mx="auto"
                                    color={_item.textColor ?? 'text.primary'}
                                  >
                                    {fCurrency(_item.value)}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.LIST_TEXT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {[..._item.value].map((_o) => _o)}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          case DATA_TYPE.CHIP_TEXT:
                            return (
                              <TableCell
                                key={`__${_item.name}__${data.id}`}
                                component="th"
                                scope="row"
                                padding="normal"
                              >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    <Chip
                                      label={_item.value}
                                      sx={{
                                        bgcolor:
                                          _item.textMapColor?.find((v) => v.status === _item.value)
                                            ?.color || 'text.primary',
                                        color: '#ffffff'
                                      }}
                                    />
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                        }
                      })}
                      {viewPath && (
                        <TableCell align="center">
                          <Link to={viewPath + `/${data.id}`}>
                            <Icon
                              icon={eyeFill}
                              width={24}
                              height={24}
                              style={{ margin: '0px auto' }}
                              color={'rgb(255, 127, 80)'}
                            />
                          </Link>
                        </TableCell>
                      )}
                      {deleteRecord && (
                        <TableCell align="center">
                          <Button onClick={() => deleteRecord(data.id)}>
                            <Icon
                              icon={trash2Outline}
                              width={24}
                              height={24}
                              style={{ margin: '0px auto' }}
                              color={'rgb(255, 127, 80)'}
                            />
                          </Button>
                        </TableCell>
                      )}
                      <TableCell
                        key={'__borderRowRight'}
                        component="th"
                        scope="row"
                        padding="normal"
                        align="justify"
                        sx={{ bgcolor: '#ffffff' }}
                      ></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    key={'__borderRowLeft'}
                    component="th"
                    scope="row"
                    padding="normal"
                    align="justify"
                    sx={{ bgcolor: '#ffffff' }}
                  ></TableCell>
                  <TableCell colSpan={6} />
                  <TableCell
                    key={'__borderRowRight'}
                    component="th"
                    scope="row"
                    padding="normal"
                    align="justify"
                    sx={{ bgcolor: '#ffffff' }}
                  ></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && (
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        )}
        {!isLoading && dataInPage.length === 0 && (
          <Box>
            <img
              src="https://minimals.cc/assets/illustrations/illustration_empty_content.svg"
              style={{ margin: '0px auto', padding: '1rem' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Không có sẵn để hiển thị
            </Typography>
          </Box>
        )}
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={(e) => handleChangeRowsPerPage}
      />
    </>
  );
}
