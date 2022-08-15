// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import ClosingProjectTable from 'components/table/filter-project-table/ClosingProjectTable';

// ----------------------------------------------------------------------

export default function CloseProjectList() {
  return (
    <Page title="Dự án: Danh sách đã kết thúc | Krowd">
      <Container maxWidth={false}>
        <ClosingProjectTable />
      </Container>
    </Page>
  );
}
