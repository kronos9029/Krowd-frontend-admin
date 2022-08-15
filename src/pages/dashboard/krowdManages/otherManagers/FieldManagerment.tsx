import { Container } from '@mui/material';
import Page from '../../../../components/Page';
import FieldTable from 'components/table/manage-other/FieldTable';

// ----------------------------------------------------------------------

export default function FieldManagement() {
  return (
    <Page title="Lĩnh vực: Danh sách | Krowd">
      <Container maxWidth={false}>
        <FieldTable />
      </Container>
    </Page>
  );
}
