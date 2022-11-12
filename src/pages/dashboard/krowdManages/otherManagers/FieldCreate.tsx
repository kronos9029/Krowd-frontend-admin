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
import { getFieldList, getFieldById } from 'redux/slices/krowd_slices/field';
import FieldNewForm from '../../../../components/_dashboard/other/Field/FieldNewForm';

// ----------------------------------------------------------------------
enum PATH {
  NEW = '/new',
  EDIT = '/edit'
}
export default function FieldCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const isEdit = pathname.includes(PATH.EDIT);
  const currentField = fieldList.listOfField.find((field) => paramCase(field.id) === id);

  useEffect(() => {
    dispatch(getFieldById(id));
  }, [dispatch]);

  return (
    <Page title="Lĩnh vực: Tạo mới | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo lĩnh vực mới' : 'Cập nhật lĩnh vực'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Tạo mới' }]}
        />

        {/* <FieldNewForm isEdit={isEdit} currentField={currentField} /> */}
      </Container>
    </Page>
  );
}
