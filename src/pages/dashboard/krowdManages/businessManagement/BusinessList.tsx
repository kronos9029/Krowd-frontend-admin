import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import closeFill from '@iconify/icons-eva/close-fill';

// material
import { Container, Box } from '@mui/material';
// routes
// hooks
// components
import Page from '../../../../components/Page';
import BusinessTable from 'components/table/BusinessTable';
import TempBusinessTable from 'components/table/TempBusinessTable';

// ----------------------------------------------------------------------

const TABLE_HEAD_NONE = [
  { id: 'email', label: 'EMAIL', alignRight: false },
  { id: 'name', label: 'TÊN DOANH NGHIỆP', alignRight: false },
  { id: '', label: 'THAO TÁC', alignRight: false }
];

// ----------------------------------------------------------------------

export default function UserList() {
  return (
    <Page title="Doanh nghiệp: Danh sách | Krowd">
      <Container maxWidth={false}>
        <Box mb={5}>
          <BusinessTable />
        </Box>
        <Box mb={5}>
          <TempBusinessTable />
        </Box>
      </Container>
    </Page>
  );
}
