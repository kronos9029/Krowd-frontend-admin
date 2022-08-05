import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import closeFill from '@iconify/icons-eva/close-fill';

// material
import { useTheme } from '@mui/material/styles';
import { Container, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'components/@material-extend';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import {
  delBusinessListById,
  getAllTempBusiness,
  getBusinessList,
  getBusinessListById
} from 'redux/slices/krowd_slices/business';
import { getProjectByBusinessID } from 'redux/slices/krowd_slices/project';
// routes
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import BusinessTable from 'components/table/BusinessTable';

// ----------------------------------------------------------------------

const TABLE_HEAD_NONE = [
  { id: 'email', label: 'EMAIL', alignRight: false },
  { id: 'name', label: 'Doanh nghiệp', alignRight: false },
  { id: '', label: 'THAO TÁC', alignRight: false }
];

// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTempBusiness());
  }, [dispatch]);

  return (
    <Page title="Doanh nghiệp: Danh sách | Krowd">
      <Container maxWidth={false}>
        <Box mb={5}>
          <BusinessTable />
        </Box>
        {/* <Box mt={5}>
          <HeaderBreadcrumbs
            // heading={isFetching ? 'Loading' : 'Danh sách các doanh nghiệp'}
            heading="Các doanh nghiệp chưa công khai"
            links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.business.newAccount}
                startIcon={<Icon icon={plusFill} />}
              >
                Tạo mới doanh nghiệp
              </Button>
            }
          /> */}

        {/* <KrowdListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}
        {/* <KrowdBusinessFilter /> */}

        {/* <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_NONE}
                  rowCount={businessLists.numOfBusiness}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {tempBusinessList.length > 0 &&
                    tempBusinessList.map((row) => {
                      const { email, displayName, uid } = row;
                      const isItemSelected = selected.indexOf(email) !== -1;
                      return (
                        <TableRow
                          hover
                          key={uid}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {email}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{displayName}</TableCell>

                          <TableCell align="left">
                            {' '}
                            <UserMoreMenu
                              onView={() => handleGetBusinessById(uid)}
                              onDelete={() => handleDeleteBusinessById(uid)}
                            />
                          </TableCell>
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
            count={businessLists.numOfBusiness}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
          />
        </Box> */}
      </Container>
    </Page>
  );
}
