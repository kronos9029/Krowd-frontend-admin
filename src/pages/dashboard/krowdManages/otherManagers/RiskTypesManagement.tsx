import { Container } from '@mui/material';
// redux

import Page from '../../../../components/Page';

import RiskTypeTable from 'components/table/manage-other/RiskTypeTable';

// ----------------------------------------------------------------------

export default function FieldManagement() {
  return (
    <Page title="Các loại rủi ro: Danh sách | Krowd">
      <Container maxWidth={false}>
        <RiskTypeTable />
      </Container>
    </Page>
  );
}
