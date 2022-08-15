// material
import { Container } from '@mui/material';

import ProjectTable from 'components/table/ProjectTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function ProjectList() {
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={false}>
        <ProjectTable />
      </Container>
    </Page>
  );
}
