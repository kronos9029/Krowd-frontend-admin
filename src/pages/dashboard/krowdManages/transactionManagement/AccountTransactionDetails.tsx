// material
import { Container } from '@mui/material';

// components
import Page from '../../../../components/Page';

import { InvoiceToolbar } from 'components/_dashboard/e-commerce/invoice';
import AccountTransactionTable from 'components/table/AccountTransactionTable';

// ----------------------------------------------------------------------

export default function AccountTransactionDetails() {
  return (
    <Page title="Giao dịch: ngân hàng  | Krowd">
      <Container maxWidth={false}>
        <AccountTransactionTable />
        {/* <InvoiceToolbar invoice={row} /> */}
      </Container>
    </Page>
  );
}
