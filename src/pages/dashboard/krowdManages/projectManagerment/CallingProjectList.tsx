// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import CallingProjectTable from 'components/table/filter-project-table/CallingProjectTable';

// ----------------------------------------------------------------------

export default function CallingProjectList() {
  return (
    <Page title="Dự án: Danh sách đang kêu gọi| Krowd">
      <Container maxWidth={false}>
        <CallingProjectTable />
      </Container>
    </Page>
  );
}
