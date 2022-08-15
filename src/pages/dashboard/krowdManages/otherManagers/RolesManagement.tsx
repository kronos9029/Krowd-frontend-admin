import { Container } from '@mui/material';

import Page from '../../../../components/Page';

import RoleTable from 'components/table/manage-other/RoleTable';

// ----------------------------------------------------------------------

export default function RolesManagement() {
  return (
    <Page title="Vai trò: Danh sách | Krowd">
      <Container maxWidth={false}>
        <RoleTable />
      </Container>
    </Page>
  );
}
