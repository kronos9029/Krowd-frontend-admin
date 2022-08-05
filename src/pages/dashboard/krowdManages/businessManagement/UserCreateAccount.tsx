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
import UserNewAccountForm from 'components/_dashboard/user/UserNewAccountForm';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import { getFieldListById } from 'redux/slices/krowd_slices/field';

// ----------------------------------------------------------------------

export default function UserCreateAccount() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const { businessLists } = useSelector((state: RootState) => state.business);
  const isEdit = pathname.includes('edit');
  const currentUser = businessLists.listOfBusiness.find(
    (business) => paramCase(business.id) === id
  );

  useEffect(() => {
    dispatch(getFieldListById(id));
  }, [dispatch]);

  return (
    <Page title="Doanh nghiệp: Tạo mới | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo mới tài khoản doanh nghiệp' : 'Cập nhật người dùng'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Tạo mới' }]}
        />

        <UserNewAccountForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
