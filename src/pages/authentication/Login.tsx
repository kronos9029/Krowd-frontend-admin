// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';

const RootStyle = styled(Page)(({ theme }) => ({
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
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Chào mừng admin trở lại
          </Typography>
          <img src="/static/illustrations/illustration_admin_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="column" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ px: 5, mt: 5, mb: 5, color: '#14b7cc', textAlign: 'center' }}
            >
              Đăng nhập vào KROWD
            </Typography>
            <LoginForm />
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
