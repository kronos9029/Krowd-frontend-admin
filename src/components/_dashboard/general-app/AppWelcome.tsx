import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps, Box } from '@mui/material';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: '#14b7cc',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function AppWelcome({ displayName }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4">
          Chào mừng trở lại,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        {/* <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
        </Typography> */}

        {/* <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button> */}
      </CardContent>
      <Box
        component="img"
        src="/static/illustrations/illustration_admin_control.png"
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
      {/* <SeoIllustration
        sx={{
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> */}
    </RootStyle>
  );
}
