import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// @types
import axios from 'axios';
import { RiskTypes } from '../../../../@types/krowd/riskTypeKrowd';
// ----------------------------------------------------------------------

type RiskTypeFormProps = {
  isEdit: boolean;
  currentRisk?: RiskTypes;
};

export default function RiskTypeForm({ isEdit, currentRisk }: RiskTypeFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên'),
    description: Yup.string().required('Yêu cầu nhập mô tả')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentRisk?.name || '',
      description: currentRisk?.description || ''
    },
    validationSchema: NewBusinessSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (!isEdit) {
        try {
          await axios.post(
            `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/risk_types`,
            values
          );
          resetForm();
          setSubmitting(true);
          enqueueSnackbar('Tạo mới thành công', {
            variant: 'success'
          });
          navigate(PATH_DASHBOARD.other.risk);
        } catch (error) {
          console.error(error);
          setSubmitting(false);
        }
      } else {
        try {
          await axios.put(
            `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/risk_types/${currentRisk?.id}`,
            values
          );
          resetForm();
          setSubmitting(true);
          enqueueSnackbar('Cập nhật thành công', {
            variant: 'success'
          });
          navigate(PATH_DASHBOARD.other.risk);
        } catch (error) {
          console.error(error);
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên loại rủi ro"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Tạo mới loại rủi ro' : 'Lưu thay đổi'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
