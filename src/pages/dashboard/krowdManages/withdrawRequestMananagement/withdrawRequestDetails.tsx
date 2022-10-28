// material
import { Container } from '@mui/material';

// components
import Page from '../../../../components/Page';

import WithdrawRequestTable from 'components/table/WithdrawRequestTable';

// ----------------------------------------------------------------------

export default function WithdrawRequestDetails() {
  return (
    <Page title="Giao dịch: Lệnh rút tiền  | Krowd">
      <Container maxWidth={false}>
        <WithdrawRequestTable />
      </Container>
    </Page>
  );
}
