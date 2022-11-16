// material
import { Container, Box } from '@mui/material';

import Page from '../../../../components/Page';
import BusinessTable from 'components/table/BusinessTable';

// ----------------------------------------------------------------------

export default function BusinessList() {
  return (
    <Page title="Doanh nghiệp: Danh sách | Krowd">
      <Container maxWidth={false}>
        <Box mb={5}>
          <BusinessTable />
        </Box>
      </Container>
    </Page>
  );
}
