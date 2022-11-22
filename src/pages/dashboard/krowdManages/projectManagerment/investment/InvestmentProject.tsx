// material
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import Page from 'components/Page';
import ProjectOfInvestment from 'components/table/investment-project/ProjectOfInvestment';

// ----------------------------------------------------------------------

export default function InvestmentProject() {
  return (
    <Page title="Danh sách đầu tư | Krowd dành cho quản lý">
      <Container maxWidth={false}>
        <ProjectOfInvestment />
      </Container>
    </Page>
  );
}
