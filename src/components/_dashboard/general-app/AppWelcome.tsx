import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps, Box } from '@mui/material';
import { SeoIllustration } from '../../../assets';
import useAuth from 'hooks/useAuth';
import { UserKrowd } from '../../../@types/krowd/users';

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
  admin?: UserKrowd | null;
  user?: any;
}
export default function AppWelcome({ user, admin }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h3">
          Chào mừng trở lại, <br />
          {user?.fullName}
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
