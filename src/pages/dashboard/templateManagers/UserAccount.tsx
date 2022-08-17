import { Container, Box } from '@mui/material';
// redux
import { useDispatch } from 'redux/store';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { AccountGeneral } from 'components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  return (
    <Page title="User: Account Settings | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tài khoản"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Cài đặt thông tin' }
          ]}
        />
        <Box sx={{ mb: 5 }} />
        <AccountGeneral />
      </Container>
    </Page>
  );
}
