import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material

import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function LoginForm() {
  const { login, loginWithGoogle, user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải đúng định dạng').required('Yêu cầu nhập email'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu')
  });

  const handleLoginGoogle = async () => {
    try {
      const userAuth = await loginWithGoogle();
      const Aa = (await userAuth?.user?.getIdTokenResult())?.token;
      console.log('aaaa userId', Aa);
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        enqueueSnackbar('Đăng nhập thành công', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          // setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
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
        loading={isSubmitting}
        onClick={handleLoginGoogle}
      >
        <img
          src={`/static/icons/navbar/ic_google.svg`}
          style={{ paddingRight: '1rem' }}
          height={24}
        />{' '}
        Đăng nhập với Google
      </LoadingButton>
    </FormikProvider>
  );
}
