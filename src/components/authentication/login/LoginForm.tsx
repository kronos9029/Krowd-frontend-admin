// material

import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
//
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    try {
      await login();
      navigate(PATH_DASHBOARD.root);
    } catch (error) {
      navigate(PATH_PAGE.page500);
    }
  };

  return (
    <>
      <Box sx={{ p: 7 }}>
        <Typography variant="h5" sx={{ color: '#002226', fontWeight: '800', textAlign: 'center' }}>
          Đăng nhập vào hệ thống của Krowd
        </Typography>
        <LoadingButton
          style={{
            backgroundColor: '#FFF',
            color: 'black',
            marginTop: '2rem',
            paddingRight: '2rem'
          }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleLoginGoogle}
        >
          <img
            src={`/static/icons/navbar/ic_google.svg`}
            style={{ paddingRight: '1rem' }}
            height={24}
          />{' '}
          Đăng nhập với Google
        </LoadingButton>
      </Box>
    </>
  );
}
