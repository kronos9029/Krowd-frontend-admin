import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Container, Grid, Stack, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// @types
import axios from 'axios';
import { Field } from '../../../../@types/krowd/fields';
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import Typography from 'theme/overrides/Typography';
// ----------------------------------------------------------------------

type FieldNewFormProps = {
  currentField: Field;
};

export default function FieldNewForm({ currentField: field }: FieldNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Page title="Lĩnh vực: Tạo mới | Krowd">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={'Chi tiết lĩnh vực'}
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Danh sách lĩnh vực', href: PATH_DASHBOARD.other.fields },
            { name: field.name }
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => {}}
              startIcon={<Icon icon={trash2Outline} />}
            >
              "Xóa lĩnh vực"
            </Button>
          }
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  {field.name}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
// const formik = useFormik({
//   enableReinitialize: true,
//   initialValues: {
//     name: currentField?.name || '',
//     description: currentField?.description || ''
//   },
//   validationSchema: NewBusinessSchema,
//  const NewBusinessSchema = Yup.object().shape({
//     name: Yup.string().required('Yêu cầu nhập tên'),
//     description: Yup.string().required('Yêu cầu nhập mô tả')
//   });
//   onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
//     if (!isEdit) {
//       try {
//         await axios.post(
//           `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/fields`,
//           values
//         );
//         resetForm();
//         setSubmitting(true);
//         enqueueSnackbar('Tạo mới thành công', {
//           variant: 'success'
//         });
//         navigate(PATH_DASHBOARD.other.field);
//       } catch (error) {
//         console.error(error);
//         setSubmitting(false);
//       }
//     } else {
//       try {
//         await axios.put(
//           `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/fields/${currentField?.id}`,
//           values
//         );
//         resetForm();
//         setSubmitting(true);
//         enqueueSnackbar('Cập nhật thành công', {
//           variant: 'success'
//         });
//         navigate(PATH_DASHBOARD.other.field);
//       } catch (error) {
//         console.error(error);
//         setSubmitting(false);
//       }
//     }
//   }
// });

// const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
//   formik;
