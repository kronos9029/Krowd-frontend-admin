// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import WaitingProjectTable from 'components/table/filter-project-table/WaitingProjectTable';

// ----------------------------------------------------------------------

export default function WaitingProjectList() {
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={false}>
        <WaitingProjectTable />
      </Container>
    </Page>
  );
}
