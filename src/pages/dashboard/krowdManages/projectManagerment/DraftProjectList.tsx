// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import DraftProjectTable from 'components/table/filter-project-table/DraftProjectTable';

// ----------------------------------------------------------------------

export default function DraftProjectList() {
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={false}>
        <DraftProjectTable />
      </Container>
    </Page>
  );
}
