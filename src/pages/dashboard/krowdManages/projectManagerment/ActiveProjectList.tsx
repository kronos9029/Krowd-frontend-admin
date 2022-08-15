// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import ActiveProjectTable from 'components/table/filter-project-table/ActiveProjectTable';

// ----------------------------------------------------------------------

export default function ActiveProjectList() {
  return (
    <Page title="Dự án: Danh sách đang hoạt động| Krowd">
      <Container maxWidth={false}>
        <ActiveProjectTable />
      </Container>
    </Page>
  );
}
