// material
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import Page from 'components/Page';
import StageReportPeriodRevenue from 'components/table/report/StageReportPeriodRevenue';

// ----------------------------------------------------------------------

export default function BillReportDailyProject() {
  return (
    <Page title="Giai đoạn | Krowd dành cho quản lý">
      <Container maxWidth={false}>
        <StageReportPeriodRevenue />
      </Container>
    </Page>
  );
}
