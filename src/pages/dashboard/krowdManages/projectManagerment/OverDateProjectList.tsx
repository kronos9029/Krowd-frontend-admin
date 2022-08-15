// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import OverDateProjectTable from 'components/table/filter-project-table/OverDateProjectTable';

// ----------------------------------------------------------------------

export default function OverDateProjectList() {
  return (
    <Page title="Dự án: Danh sách quá hạn đầu tư | Krowd">
      <Container maxWidth={false}>
        <OverDateProjectTable />
      </Container>
    </Page>
  );
}
