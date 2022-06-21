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
import {
  delBusinessListById,
  getBusinessList,
  getBusinessListById
} from 'redux/slices/krowd_slices/business';
import { getProjectByBusinessID } from 'redux/slices/krowd_slices/project';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { BusinessManager } from '../../../../@types/krowd/business';
// components
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import UserMoreMenu from 'components/_dashboard/e-commerce/invoice/UserMoreMenu';
import { UserListHead, KrowdListToolbar } from '../../../../components/_dashboard/user/list';
import { KrowdBusinessFilter } from 'components/_dashboard/e-commerce/projectKrowd';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'numOfProject', label: 'Số dự án', alignRight: false },
  { id: 'numOfSuccessfulProject', label: 'Dự án hoàn thành', alignRight: false },
  { id: 'successfulRate', label: 'Tỉ lệ thành công', alignRight: false },
  { id: 'createDate', label: 'Thành lập', alignRight: false },
  { id: 'createBy', label: 'Chủ công ty', alignRight: false },
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
  array: BusinessManager[],
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { businessList } = useSelector((state: RootState) => state.business);
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
    dispatch(getBusinessList());
  }, [dispatch]);
  const handleDeleteBusinessById = (activeBussinessId: string) => {
    dispatch(delBusinessListById(activeBussinessId));
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  const handleGetBusinessById = (activeBussinessId: string) => {
    dispatch(getBusinessListById(activeBussinessId));
    dispatch(getProjectByBusinessID(activeBussinessId, 'ADMIN'));
  };

  // Sort filter
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = businessList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - businessList.length) : 0;

  const filteredUsers = applySortFilter(businessList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="Doanh nghiệp: Danh sách | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          // heading={isFetching ? 'Loading' : 'Danh sách các doanh nghiệp'}
          heading="Danh sách các doanh nghiệp"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.business.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới doanh nghiệp
            </Button>
          }
        />

        <Card>
          {/* <KrowdListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}
          {/* <KrowdBusinessFilter /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={businessList.length}
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
                        name,
                        image,
                        numOfProject,
                        numOfSuccessfulProject,
                        successfulRate,
                        createDate,
                        createBy,
                        status
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
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
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{numOfProject}</TableCell>
                          <TableCell align="center">{numOfSuccessfulProject}</TableCell>
                          <TableCell align="center">{successfulRate}</TableCell>
                          <TableCell style={{ minWidth: 160 }}>{fDate(createDate)}</TableCell>
                          <TableCell align="left">{createBy || '-'}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <UserMoreMenu
                            onView={() => handleGetBusinessById(id)}
                            onDelete={() => handleDeleteBusinessById(id)}
                          />
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
            count={businessList.length}
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
