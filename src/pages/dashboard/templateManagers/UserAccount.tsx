import { Container, Box, Button, CircularProgress, Typography } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { AccountGeneral } from 'components/_dashboard/user/account';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { getMainUserProfile } from 'redux/slices/krowd_slices/users';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import UserNewAccountForm from 'components/_dashboard/user/UserNewAccountForm';
import UserAccountForm from 'components/_dashboard/user/UserNewForm';
import UserKrowdForm from 'components/_dashboard/user/UserKrowdForm';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { user: authUser } = useAuth();
  const { mainUserState } = useSelector((state: RootState) => state.userKrowd);
  const { isLoading, user: mainUser, error } = mainUserState;

  useEffect(() => {
    dispatch(getMainUserProfile(authUser?.id));
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Page title="User: Account Settings | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tài khoản của bạn"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Quản lý tài khoản' }
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={editFill} />}
              onClick={handleClickOpen}
              color="warning"
            >
              Cập nhật tài khoản
            </Button>
          }
        />
        {mainUser && <UserKrowdForm user={mainUser} open={open} onClose={handleClose} />}
        {(isLoading && (
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        )) ||
          (mainUser && <AccountGeneral user={mainUser} />)}
      </Container>
    </Page>
  );
}
