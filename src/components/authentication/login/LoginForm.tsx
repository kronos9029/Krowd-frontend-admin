import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import facebookFill from '@iconify/icons-eva/facebook-fill';
import googleFill from '@iconify/icons-eva/google-fill';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
// import Login from 'pages/authentication/Login';
// import firebase from 'firebase/app';

// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function LoginForm() {
  // const { loginWithGoogle } = useAuth();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải đúng định dạng').required('Yêu cầu nhập Phone'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu')
  });

  // const { loginWithGoogle, loginWithFaceBook, login, loginWithPhone } = useAuth();
  // const SOCIALS = [
  //   { name: 'FaceBook', icon: facebookFill },
  //   { name: 'Google', icon: googleFill }
  // ];

  // const handleLoginPhone = () => {
  //   // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  //   const appVerifier2 = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  //     size: 'invisible',
  //     callback: function () {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       onSignInSubmit();
  //     }
  //   });
  // };
  // const onSignInSubmit = () => {
  //   const phoneNumber = '+848540036';
  //   // const appVerifier = '123456';
  //   const appVerifier = window;
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       // window.confirmationResult = confirmationResult;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // };
  //dang xai cai nay
  // const handleLoginGoogle = async () => {
  //   try {
  //     await loginWithGoogle?.();
  //     // const res = await auth.signInWithPopup(googleProvider);
  //     // console.log("data", res)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // ban demo email
  // const handleLoginEmail = async () => {
  //   try {
  //     await Login?.();
  //     // const res = await auth.signInWithPopup(googleProvider);
  //     // console.log("data", res)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // ban demo facebook
  // const handleLoginFaceBook = async () => {
  //   try {
  //     await loginWithFaceBook?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });
  //   onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
  //     try {
  //       await login(values.email, values.password);
  //       if (isMountedRef.current) {
  //         setSubmitting(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       resetForm();
  //       if (isMountedRef.current) {
  //         setSubmitting(false);
  //         setErrors({ afterSubmit: error.message });
  //       }
  //     }
  //   }
  // });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          {/* <TextField
            fullWidth
            autoComplete="username"
            type="number"
            label="Phone"
            onChange={(e) => setPhoneNum(e.target.value)}
            // {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          /> */}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Địa chỉ email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Ghi nhớ"
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Quên mật khẩu?
          </Link>
        </Stack>
        {/* 
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          // onClick={handleLoginEmail}
        >
          Login
        </LoadingButton> */}
      </Form>
      {/* 
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
        onClick={handleLoginPhone}
      >
        <Icon icon={googleFill} color="green" height={24} />
        Login with Phone
      </LoadingButton> */}
      {/*van dang chay lenh phia duoi*/}
      {/* <LoadingButton
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
        <Icon icon={googleFill} color="green" height={24} />
        Login with google
      </LoadingButton> */}
      {/* <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleLoginFaceBook}
      >
        Login with facebook
      </LoadingButton> */}
    </FormikProvider>
  );
}
