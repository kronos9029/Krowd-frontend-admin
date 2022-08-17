// material

import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
//
import { useNavigate } from 'react-router-dom';

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
  );
}
