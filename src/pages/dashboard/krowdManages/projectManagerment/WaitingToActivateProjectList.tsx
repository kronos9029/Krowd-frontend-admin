// material
import { Container } from '@mui/material';

import Page from 'components/Page';
import WaitingForActivate from 'components/table/filter-project-table/WaitingForActivate';

// ----------------------------------------------------------------------

export default function WaitingToActivateProjectList() {
  return (
    <Page title="Dự án: Danh sách đang hoạt động| Krowd">
      <Container maxWidth={false}>
        <WaitingForActivate />
      </Container>
    </Page>
  );
}
