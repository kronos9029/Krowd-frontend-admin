import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
// import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// @types
// import { UserManager } from '../../@types/user';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UserListHead, KrowdListToolbar } from '../../../../components/_dashboard/user/list';
import { delFieldListById, getFieldList, getFieldListById } from 'redux/slices/krowd_slices/field';
import { Field } from '../../../../@types/krowd/fields';
import { fDate } from 'utils/formatTime';
import { MIconButton } from 'components/@material-extend';
import UserMoreMenu from 'components/_dashboard/e-commerce/invoice/UserMoreMenu';

import { getBusinessListById, getProjectByBusinessID } from 'redux/slices/krowd_slices/business';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';

import Modal from '@mui/material';
import OtherMoreMenu from 'components/_dashboard/other/OtherMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'description', label: 'Mô tả', alignRight: true },
  { id: 'createDate', label: 'Ngày tạo', alignRight: true },
  { id: 'createBy', label: 'Người tạo', alignRight: true },
  { id: 'updateDate', label: 'Ngày cập nhật', alignRight: true },
  { id: 'updateBy', label: 'Người cập nhật', alignRight: true },
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

function applySortFilter(array: Field[], comparator: (a: any, b: any) => number, query: string) {
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

export default function FieldManagement() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getFieldList());
  }, [dispatch]);

  const handleDeleteFieldById = (activeFieldId: string) => {
    dispatch(delFieldListById(activeFieldId));
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  const handleGetFieldById = (activeFieldId: string) => {
    dispatch(getFieldListById(activeFieldId));
  };
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fieldList.length) : 0;

  const filteredUsers = applySortFilter(fieldList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Lĩnh vực: Danh sách | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách các loại lĩnh vực"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.other.newField}
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo mới lĩnh vực
            </Button>
          }
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
                  rowCount={fieldList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, description, createDate, createBy, updateDate, updateBy } =
                        row;
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
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{description}</TableCell>
                          <TableCell align="center" style={{ minWidth: 160 }}>
                            {fDate(createDate)}
                          </TableCell>
                          <TableCell align="center">{createBy || '-'}</TableCell>
                          <TableCell align="center" style={{ minWidth: 160 }}>
                            {fDate(updateDate)}
                          </TableCell>
                          <TableCell align="center">{updateBy || '-'}</TableCell>
                          <OtherMoreMenu
                            onDelete={() => handleDeleteFieldById(id)}
                            onEdit={() => handleGetFieldById(id)}
                            editById={id}
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
            count={fieldList.length}
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
