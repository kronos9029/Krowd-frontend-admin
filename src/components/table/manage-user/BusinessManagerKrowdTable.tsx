import { ROLE_USER_TYPE } from '../../../@types/krowd/users';
import { useEffect, useState } from 'react';
import { getUserKrowdList } from 'redux/slices/krowd_slices/users';
import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: 'left' },
  { id: 'fullName', label: 'HỌ VÀ TÊN', align: 'left' },
  { id: 'phoneNum', label: 'SỐ ĐIỆN THOẠI', align: 'left' },
  { id: 'email', label: 'EMAIL', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function BusinessManagerKrowdTable() {
  const { userLists, isLoading } = useSelector((state: RootState) => state.userKrowd);
  const { listOfUser: list } = userLists;
  // const { businessState } = useSelector((state: RootState) => state.business);
  // const { businessLists } = businessState;
  // const { listOfBusiness } = businessLists;
  // const NewBusinessSchema = Yup.object().shape({
  //   lastName: Yup.string().required('Yêu cầu nhập họ'),
  //   firstName: Yup.string().required('Yêu cầu nhập tên'),
  //   email: Yup.string().required('Yêu cầu nhập email').email()
  // });
  // const { enqueueSnackbar } = useSnackbar();
  // useEffect(() => {
  //   dispatch(getBusinessList());
  // }, [dispatch]);
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   // dispatch(getFieldList());
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   resetForm();
  // };
  // function getToken() {
  //   return window.localStorage.getItem('accessToken');
  // }
  // function getHeaderFormData() {
  //   const token = getToken();
  //   return { Authorization: `Bearer ${token}` };
  // }
  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     lastName: '',
  //     firstName: '',
  //     email: ''
  //   },
  //   validationSchema: NewBusinessSchema,

  //   onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
  //     try {
  //       const headers = getHeaderFormData();

  //       await axios.post(
  //         `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users`,
  //         values,
  //         {
  //           headers: headers
  //         }
  //       );
  //       dispatch(getBusinessList());

  //       resetForm();
  //       setSubmitting(true);
  //       enqueueSnackbar('Tạo mới thành công', {
  //         variant: 'success'
  //       });
  //       // navigate(PATH_DASHBOARD.admin.listBusiness);
  //     } catch (error) {
  //       console.error(error);
  //       setSubmitting(false);
  //     }
  //   }
  // });

  // const {
  //   errors,
  //   values,
  //   touched,
  //   handleSubmit,
  //   isSubmitting,
  //   setFieldValue,
  //   resetForm,
  //   getFieldProps
  // } = formik;
  // console.log(formik);
  useEffect(() => {
    dispatch(getUserKrowdList(ROLE_USER_TYPE.BUSINESS_MANAGER));
  }, [dispatch]);

  const getData = (): RowData[] => {
    if (!list) return [];
    return (
      list
        // .filter((_item) => _item.role.name === ROLE_USER_TYPE.BUSINESS_MANAGER)
        .map<RowData>((_item, _idx) => {
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
                name: 'fullname',
                value: `${_item.firstName} ${_item.lastName}`,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'phoneNum',
                value: _item.phoneNum,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'email',
                value: _item.email,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'createDate',
                value: _item.createDate,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'status',
                value: `${_item.status}` === 'ACTIVE' ? 'Đang hoạt động' : 'Chưa hoạt động',
                type: DATA_TYPE.TEXT,
                textColor: `${_item.status}` === 'ACTIVE' ? 'green' : 'black'
              }
            ]
          };
        })
    );
  };

  return (
    <KrowdTable
      headingTitle="người quản lý doanh nghiệp"
      // action={
      //   <Box>
      //     <Button
      //       startIcon={<Icon icon={plusFill} width={16} height={16} />}
      //       onClick={handleClickOpen}
      //       size="medium"
      //       variant="contained"
      //     >
      //       Tạo mới doanh nghiệp
      //     </Button>
      //     <Dialog
      //       open={open}
      //       aria-labelledby="modal-modal-title"
      //       aria-describedby="modal-modal-description"
      //     >
      //       <FormikProvider value={formik}>
      //         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      //           <DialogTitle>Tạo mới chủ doanh nghiệp</DialogTitle>
      //           <DialogContent>
      //             <Box my={3}>
      //               <DialogContentText>Điền thông tin chủ doanh nghiệp.</DialogContentText>
      //               <Typography variant="caption" color="#B78103">
      //                 * Những thông tin trống vui lòng điền "N/A".
      //               </Typography>
      //             </Box>
      //             <Stack spacing={3}>
      //               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
      //                 <TextField
      //                   fullWidth
      //                   label="Họ"
      //                   {...getFieldProps('firstName')}
      //                   error={Boolean(touched.firstName && errors.firstName)}
      //                   helperText={touched.firstName && errors.firstName}
      //                 />
      //                 <TextField
      //                   fullWidth
      //                   label="Tên"
      //                   {...getFieldProps('lastName')}
      //                   error={Boolean(touched.lastName && errors.lastName)}
      //                   helperText={touched.lastName && errors.lastName}
      //                 />

      //                 <TextField
      //                   fullWidth
      //                   label="Địa chỉ email"
      //                   {...getFieldProps('email')}
      //                   error={Boolean(touched.email && errors.email)}
      //                   helperText={touched.email && errors.email}
      //                 />
      //               </Stack>
      //               <Stack spacing={3}>
      //                 <Autocomplete
      //                   onChange={(_, newValue) => {
      //                     setFieldValue('businessId', newValue?.id);
      //                   }}
      //                   options={businessLists.listOfBusiness.filter(
      //                     (value) => value.status === 'INACTIVE'
      //                   )}
      //                   getOptionLabel={(option) => option.name}
      //                   renderOption={(props, option) => (
      //                     <Box component="li" {...props}>
      //                       {option.name}
      //                     </Box>
      //                   )}
      //                   renderInput={(params) => (
      //                     <TextField
      //                       {...params}
      //                       inputProps={{
      //                         ...params.inputProps,
      //                         autoComplete: 'new-password' // disable autocomplete and autofill
      //                       }}
      //                       label="Doanh nghiệp trống"
      //                     />
      //                   )}
      //                 />
      //               </Stack>
      //             </Stack>
      //           </DialogContent>
      //           <DialogActions>
      //             <Button onClick={handleClose}>Đóng</Button>
      //             <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
      //               Lưu
      //             </LoadingButton>
      //           </DialogActions>
      //         </Form>
      //       </FormikProvider>
      //     </Dialog>
      //   </Box>
      // }
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      deleteRecord={() => {}}
    />
  );
}
