import { useState, useEffect } from 'react';
// material
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// components
import { delFieldListById, getFieldList } from 'redux/slices/krowd_slices/field';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';

import * as Yup from 'yup';

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { OtherKrowdAPI } from '_apis_/krowd_apis/other';
import { MIconButton } from 'components/@material-extend';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN', align: 'left' },
  { id: 'description', label: 'MÔ TẢ', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  // { id: 'createBy', label: 'NGƯỜI TẠO', align: 'left' },
  { id: 'updateDate', label: 'NGÀY CẬP NHẬT', align: 'left' },
  // { id: 'updateBy', label: 'NGƯỜI CẬP NHẬT', align: 'left' }
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function FieldTable() {
  const { fieldList: list, isLoading } = useSelector((state: RootState) => state.fieldKrowd);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // const [status, setStatus] = useState('');
  // const [nameSearch, setNameSearch] = useState('');
  useEffect(() => {
    dispatch(getFieldList(pageIndex, 5));
  }, [dispatch, pageIndex]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeleteFieldById = (FieldById: string) => {
    dispatch(delFieldListById(FieldById));
    enqueueSnackbar('Xóa lĩnh vực thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const NewBusinessSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên'),
    description: Yup.string().required('Yêu cầu nhập mô tả')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: NewBusinessSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        OtherKrowdAPI.post({
          name: values.name,
          description: values.description
        })
          .then(async () => {
            enqueueSnackbar('Tạo mới thành công', {
              variant: 'success'
            });
            dispatch(getFieldList(1, 5));
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
  const { errors, touched, handleSubmit, isSubmitting, resetForm, getFieldProps } = formik;
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.listOfField.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT
          },
          // {
          //   name: 'createBy',
          //   value: _item.createBy,
          //   type: DATA_TYPE.TEXT
          // },
          {
            name: 'updateDate',
            value: _item.updateDate,
            type: DATA_TYPE.TEXT
          }
          // {
          //   name: 'updateBy',
          //   value: _item.updateBy,
          //   type: DATA_TYPE.TEXT
          // }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="các loại lĩnh vực"
      action={
        <Box>
          <Button
            startIcon={<Icon icon={plusFill} width={16} height={16} />}
            onClick={handleClickOpen}
            size="medium"
            variant="contained"
          >
            Tạo lĩnh vực mới
          </Button>
          <Dialog
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <FormikProvider value={formik}>
              <Form style={{ width: 500 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <DialogTitle>Tạo lĩnh vực mới</DialogTitle>
                <DialogContent>
                  <Box my={3}>
                    <DialogContentText>Điền thông tin lĩnh vực</DialogContentText>
                    <Typography variant="caption" color="#B78103">
                      * Điền đầy đủ thông tin trống
                    </Typography>
                  </Box>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <TextField
                      required
                      fullWidth
                      label="Tên lĩnh vực"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      required
                      fullWidth
                      rows={5}
                      multiline
                      label="Mô tả lĩnh vực"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
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
      deleteRecord={handleDeleteFieldById}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: list.numOfField,

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
