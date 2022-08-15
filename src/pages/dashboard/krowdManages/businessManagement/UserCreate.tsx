import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from 'redux/store';
import { getUserList } from 'redux/slices/template_slice/user';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import UserNewForm from 'components/_dashboard/user/UserNewForm';
import { getBusinessList } from 'redux/slices/krowd_slices/business';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();

  return (
    <Page title="Doanh nghiệp: Tạo mới | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Tạo mới doanh nghiệp'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Tạo mới' }]}
        />

        <UserNewForm isEdit={false} />
      </Container>
    </Page>
  );
}
