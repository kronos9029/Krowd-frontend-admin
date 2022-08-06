import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';

// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import { fDate } from 'utils/formatTime';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'components/@material-extend';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import UserMoreMenu from 'components/_dashboard/e-commerce/invoice/UserMoreMenu';
import { UserListHead, KrowdListToolbar } from '../../../../components/_dashboard/user/list';
import { getwalletSystem } from 'redux/slices/krowd_slices/wallet';
import { SystemWallet } from '../../../../@types/krowd/wallet/systemWallet';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'balance', label: 'balance', alignRight: false },
  { id: 'walletTypeId', label: 'Loại ví', alignRight: false },
  { id: 'createDate', label: 'Ngày tạo', alignRight: false },
  { id: 'createBy', label: 'Người tạo', alignRight: false },
  { id: 'updateDate', label: 'Ngày cập nhật', alignRight: false },
  { id: 'updateBy', label: 'Người cập nhật', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: SystemWallet[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.walletTypeId.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SystemWalletList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { walletSystem } = useSelector((state: RootState) => state.wallet);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const { isLoading, data: ListBusiness, error, isFetching } = getAllBusiness();

  // API
  useEffect(() => {
    dispatch(getwalletSystem());
  }, [dispatch]);

  // const handleDeleteBusinessById = (activeBussinessId: string) => {
  //   dispatch(delBusinessListById(activeBussinessId));
  //   enqueueSnackbar('Cập nhật trạng thái thành công', {
  //     variant: 'success',
  //     action: (key) => (
  //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
  //         <Icon icon={closeFill} />
  //       </MIconButton>
  //     )
  //   });
  // };
  // const handleGetBusinessById = (activeBussinessId: string) => {
  //   dispatch(getBusinessListById(activeBussinessId));
  // };
  // Sort filter
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = walletSystem.map((n) => n.walletTypeId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - walletSystem.length) : 0;

  const filteredUsers = applySortFilter(walletSystem, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Ví của hệ thống | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          // heading={isFetching ? 'Loading' : 'Danh sách các doanh nghiệp'}
          heading="Ví của hệ thống"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
        />

        <Card>
          <KrowdListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={walletSystem.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        balance,
                        walletTypeId,
                        createDate,
                        createBy,
                        updateDate,
                        updateBy,
                        isDeleted
                      } = row;
                      const isItemSelected = selected.indexOf(walletTypeId) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={image} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {balance}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{walletTypeId}</TableCell>
                          <TableCell style={{ minWidth: 160 }}>{createDate}</TableCell>
                          <TableCell align="left">{createBy || '-'}</TableCell>
                          <TableCell style={{ minWidth: 160 }}>{updateDate}</TableCell>
                          <TableCell align="left">{updateBy || '-'}</TableCell>
                          <TableCell align="left">{isDeleted}</TableCell>
                          {/* <UserMoreMenu
                            onView={() => handleGetBusinessById(id)}
                            onDelete={() => handleDeleteBusinessById(id)}
                          /> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={walletSystem.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
