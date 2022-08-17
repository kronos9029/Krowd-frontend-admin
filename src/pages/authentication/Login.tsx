// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import { motion } from 'framer-motion';

const RootStyle = styled(Page)(({ theme }) => ({
  backgroundImage: 'url(/static/overlay.svg), url(/static/logo-image-login.jpg)',
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));
const HeroImgStyle = styled(motion.iframe)(({ theme }) => ({
  top: 0,
  right: 10,
  bottom: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute',
  objectFit: 'cover',
  opacity: 0.8,
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    height: '48vh'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function Login() {
  return (
    <RootStyle title="Login | Krowd">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ p: 5, mt: 10, mb: 5 }}>
            HỆ THỐNG KROWD CHO ADMIN
          </Typography>
          <Typography variant="h3" sx={{ p: 25 }}>
            <HeroImgStyle src="https://embed.lottiefiles.com/animation/38435" />
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack
            direction="column"
            justifyContent="space-between"
            spacing={3}
            sx={{
              height: 250,
              backgroundColor: 'rgb(114 114 114 / 3%)',
              mb: 3,
              borderRadius: '17%'
            }}
          >
            <LoginForm />
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
