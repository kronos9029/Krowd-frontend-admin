// material
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import Page from 'components/Page';
import ProjectBillDailyReport from 'components/table/report/ProjectBillDailyReport';

// ----------------------------------------------------------------------

export default function StageReportProject() {
  return (
    <Page title="Báo cáo dự án hằng ngày | Krowd dành cho quản lý">
      <Container maxWidth={false}>
        <ProjectBillDailyReport />
      </Container>
    </Page>
  );
}
