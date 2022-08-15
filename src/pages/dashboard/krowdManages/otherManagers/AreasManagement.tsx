// material
import { Container } from '@mui/material';
// redux
// import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
// hooks
// @types
// import { UserManager } from '../../@types/user';
// components
import Page from '../../../../components/Page';

import AreaTable from 'components/table/manage-other/AreaTable';

export default function FieldManagement() {
  return (
    <Page title="Khu vực: Danh sách | Krowd">
      <Container maxWidth={false}>
        <AreaTable />
      </Container>
    </Page>
  );
}
