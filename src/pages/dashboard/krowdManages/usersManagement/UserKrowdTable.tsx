// material
import { Container } from '@mui/material';
// redux
// routes
// hooks
import Page from '../../../../components/Page';

import InvestorKrowdTable from 'components/table/manage-user/InvestorKrowdTable';

// ----------------------------------------------------------------------

export default function UserKrowdTable() {
  return (
    <Page title="quản lý người đầu tư | Krowd">
      <Container maxWidth={false}>
        <InvestorKrowdTable />
      </Container>
    </Page>
  );
}
