import { BUSINESS_STATUS_ENUM } from '../../@types/krowd/business';
import { useEffect, useState } from 'react';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import plusFill from '@iconify/icons-eva/plus-fill';
import * as Yup from 'yup';

import {
  Container,
  Tab,
  Box,
  Tabs,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
  Autocomplete,
  Avatar,
  Card,
  Grid
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { BusinessAPI } from '_apis_/krowd_apis/business';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'ẢNH', align: '' },
  { id: 'name', label: 'THƯƠNG HIỆU', align: 'left' },
  { id: 'fieldList.name', label: 'LĨNH VỰC', align: 'left' },
  { id: 'numOfProject', label: 'SỐ DỰ ÁN', align: 'center' },
  { id: 'numOfSuccessfulProject', label: 'DỰ ÁN HOÀN THÀNH', align: 'center' },
  { id: 'successfulRate', label: 'TỈ LỆ THÀNH CÔNG', align: 'center' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'manager.firstName', label: 'NGƯỜI ĐẠI DIỆN', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'CHI TIẾT', align: 'center' }
];

export default function BusinessTable() {
  const { businessState } = useSelector((state: RootState) => state.business);
  const { businessLists, isLoading } = businessState;
  const { listOfBusiness: list } = businessLists;
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { listOfField } = fieldList;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    dispatch(getFieldList());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const NewBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên'),
    email: Yup.string().required('Yêu cầu nhập email').email('Email của bạn chưa hợp lệ'),
    fieldId: Yup.string().required('Yêu cầu nhập lĩnh vực'),
    phoneNum: Yup.string().required('Yêu cầu nhập số điện thoại'),
    address: Yup.string().required('Yêu cầu nhập địa chỉ')
    // taxIdentificationNumber: Yup.string().required('Yêu cầu nhập mã doanh nghiệp')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      fieldId: '',
      address: '',
      email: '',
      phoneNum: '',
      taxIdentificationNumber: ''
    },
    validationSchema: NewBusinessSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        BusinessAPI.post2({
          name: values.name,
          address: values.address,
          email: values.email,
          phoneNum: values.phoneNum,
          taxIdentificationNumber: values.taxIdentificationNumber ?? '',
          fieldId: values.fieldId
        })
          .then(async () => {
            enqueueSnackbar('Tạo mới thành công', {
              variant: 'success'
            });
            // await dispatch(getMainUserProfile(user?.id));
            // dispatch(getBusinessById(businessDetail?.id));
            dispatch(getBusinessList());
          })
          .catch(() => {
            enqueueSnackbar('Tạo mới thất bại', {
              variant: 'error'
            });
          })
          .finally(() => {
            resetForm();
            handleClose();
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    resetForm,
    getFieldProps
  } = formik;
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'image',
            value: _item.image,
            type: DATA_TYPE.IMAGE
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'field',
            value: _item.fieldList.map((_field) => _field.name),
            type: DATA_TYPE.LIST_TEXT
          },
          {
            name: 'numOfProject',
            value: _item.numOfProject,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'numOfSuccessfulProject',
            value: _item.numOfSuccessfulProject,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'successfulRate',
            value: _item.successfulRate,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'managerName',
            value: !!!_item.manager
              ? 'Chưa có quản lý thương hiệu'
              : `${_item.manager.firstName} ${_item.manager.lastName}`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value: `${_item.status}` === 'ACTIVE' ? 'Đã hoạt động' : 'Chưa hoạt động',
            type: DATA_TYPE.TEXT,
            textColor: `${_item.status}` === 'ACTIVE' ? 'green' : 'black'
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Thương hiệu"
      action={
        <Box>
          <Button
            startIcon={<Icon icon={plusFill} width={16} height={16} />}
            onClick={handleClickOpen}
            size="medium"
            variant="contained"
          >
            Tạo mới thương hiệu
          </Button>
          <Dialog
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>Tạo mới thương hiệu</DialogTitle>
                <DialogContent>
                  <Box my={3}>
                    <DialogContentText>Điền thông tin doanh nghiệp của bạn.</DialogContentText>
                    <Typography variant="caption" color="#B78103">
                      * Những thông tin trống vui lòng điền "N/A".
                    </Typography>
                  </Box>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <TextField
                      required
                      fullWidth
                      label="Tên thương hiệu"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        required
                        label="Hotline"
                        {...getFieldProps('phoneNum')}
                        error={Boolean(touched.phoneNum && errors.phoneNum)}
                        helperText={touched.phoneNum && errors.phoneNum}
                      />
                      <TextField
                        fullWidth
                        label="Mã doanh nghiệp"
                        {...getFieldProps('taxIdentificationNumber')}
                        error={Boolean(
                          touched.taxIdentificationNumber && errors.taxIdentificationNumber
                        )}
                        helperText={
                          touched.taxIdentificationNumber && errors.taxIdentificationNumber
                        }
                      />
                    </Stack>
                    <TextField
                      required
                      fullWidth
                      label="Địa chỉ"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <Stack spacing={3}>
                      <Autocomplete
                        aria-required={true}
                        onChange={(_, newValue) => {
                          setFieldValue('fieldId', newValue?.id);
                        }}
                        options={listOfField}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password' // disable autocomplete and autofill
                            }}
                            label="Lĩnh vực"
                            error={Boolean(touched.fieldId && errors.fieldId)}
                            helperText={touched.fieldId && errors.fieldId}
                          />
                        )}
                      />
                      {/* <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => {
                        setFieldValue('areaId', newValue);
                      }}
                      options={fieldList.listOfField.map((option) => option.id)}
                      renderInput={(params) => <TextField {...params} label="Khu vực" />}
                    /> */}
                    </Stack>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Đóng</Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Lưu
                  </LoadingButton>
                </DialogActions>
              </Form>
            </FormikProvider>
          </Dialog>
        </Box>
      }
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.business.details}
    />
  );
}
