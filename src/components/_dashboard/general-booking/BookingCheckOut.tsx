// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
  backgroundColor: '#14b7cc',
  color: 'black'
}));

// ----------------------------------------------------------------------

const TOTAL = 124000;

export default function BookingCheckOut() {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
        <Typography variant="subtitle2">Dự án chưa được đầu tư</Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral'
        }}
      >
        <Box
          component="img"
          src="/static/illustrations/illustration_project_design.png"
          sx={{
            zIndex: 9,
            width: 140,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))'
          }}
        />
        {/* <CheckOutIllustration /> */}
      </Box>
    </RootStyle>
  );
}
