import { ROLE_USER_TYPE } from '../../../@types/krowd/users';
import { useEffect, useState } from 'react';
import { getBusinessManagerKrowdList, getUserKrowdList } from 'redux/slices/krowd_slices/users';
import { dispatch, RootState, useSelector } from 'redux/store';
import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import blocked from '@iconify/icons-ant-design/lock-fill';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: 'left' },
  { id: 'fullName', label: 'HỌ VÀ TÊN', align: 'left' },
  { id: 'business', label: 'QUẢN LÝ', align: 'left' },
  { id: 'phoneNum', label: 'SỐ ĐIỆN THOẠI', align: 'left' },
  { id: 'email', label: 'EMAIL', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' }
  // { id: '', label: 'THAO TÁC', align: 'center' }
];
const action = [
  {
    nameAction: 'view',
    action: '',
    icon: blocked,
    color: 'red',
    type: ACTION_TYPE.BUTTON
  }
];
export default function BusinessManagerKrowdTable() {
  const { userLists, isLoading } = useSelector((state: RootState) => state.userKrowd);
  const { listOfUser: list, numOfUser } = userLists;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [status, setStatus] = useState('');
  useEffect(() => {
    dispatch(getBusinessManagerKrowdList(pageIndex, 8, '', status));
  }, [dispatch, pageIndex, status]);

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
                name: 'business',
                value: `${_item.business?.name ?? 'Chưa có thương hiệu'}`,
                type: DATA_TYPE.TEXT
              },
              {
                name: 'phoneNum',
                value: _item.phoneNum ? _item.phoneNum : 'Chưa cập nhật',
                type: DATA_TYPE.TEXT,
                textColor: _item.phoneNum === null ? 'red' : 'black'
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
      headingTitle="NGƯỜI QUẢN LÝ THƯƠNG HIỆU"
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
      // actionsButton={action}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfUser,

        handleNext() {
          setPageIndex(pageIndex + 1);
        },
        handlePrevious() {
          setPageIndex(pageIndex - 1);
        }
      }}
    />
  );
}
