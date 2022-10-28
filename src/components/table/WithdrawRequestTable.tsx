import { useState, useEffect, useCallback, forwardRef } from 'react';
// material
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// components
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getAllWithdrawRequest } from 'redux/slices/krowd_slices/withdrawRequest';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { WithdrawRequestType } from '../../@types/krowd/withdrawRequest/withdrawRequest';
import { UploadSingleFile } from 'components/upload';
import { CustomFile } from 'components/upload/UploadSingleFile';
import { width } from '@mui/system';
import { WithdrawRequestAPI } from '_apis_/krowd_apis/withdrawRequest';
import { useSnackbar } from 'notistack';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab';
import { fCurrency } from 'utils/formatNumber';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/users';
// ----------------------------------------------------------------------
const BoldText = styled('span')({
  fontWeight: 'bold'
});
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'accountName', label: 'CHỦ TÀI KHOẢN', align: 'left' },
  { id: 'bankAccount', label: 'SỐ TÀI KHOẢN', align: 'left' },
  { id: 'bankName', label: 'TÊN NGÂN HÀNG', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN RÚT', align: 'left' },
  { id: 'refusalReason', label: 'LÝ DO TỪ CHỐI', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'createBy', label: 'NGƯỜI TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];
const STATUS_RENDER = [
  { status: 'PENDING', vi: 'Chờ xử lý' },
  { status: 'PARTIAL', vi: 'Đã xác nhận' },
  { status: 'REJECTED', vi: 'Đã từ chối' },
  { status: 'REPORT', vi: 'Người dùng báo lỗi' }
];
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AccountTransactionTable() {
  const { withdrawRequestList: list, isLoading } = useSelector(
    (state: RootState) => state.withdrawRequest
  );
  const { userKrowdDetailState: userState } = useSelector((state: RootState) => state.userKrowd);
  const { userKrowdDetail: user } = userState;
  const [open, setOpen] = useState(false);
  const [currentWithdrawRequest, setCurrentWithdrawRequest] = useState<WithdrawRequestType>();
  const [imageFile, setImageFile] = useState<CustomFile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('PENDING');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [transferStatus, setTransferStatus] = useState<string>('success');
  const [refusalReason, setRefusalReason] = useState<string | null>(null);
  const [idUser, setIdUser] = useState<string | null>(null);
  const getCreateByInfo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setIdUser(id ?? idUser);
  };
  const searchUser = async () => {
    if (idUser) dispatch(getUserKrowdDetail(idUser));
  };
  const handleClickOpen = (id: string) => {
    setCurrentWithdrawRequest(list.find((e) => e.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setImageFile(null);
    setFile(null);
    setTransferStatus('success');
    setRefusalReason(null);
    setOpen(false);
  };

  const handleChangeFilter = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value);
  };

  const handleChangeTranferStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferStatus((event.target as HTMLInputElement).value);
    setImageFile(null);
    setFile(null);
    setRefusalReason(null);
  };

  const handleChangeRefusalReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefusalReason((event.target as HTMLInputElement).value);
  };

  const handleSubmitOK = async () => {
    setIsLoadingButton(true);
    await WithdrawRequestAPI.approveWithdrawRequest({
      requestId: currentWithdrawRequest?.id!,
      receipt: file!
    })
      .then(async () => {
        enqueueSnackbar('Xác nhận thành công', {
          variant: 'success'
        });
        dispatch(getAllWithdrawRequest());
      })
      .catch(() => {
        enqueueSnackbar('Xác nhận thất bại', {
          variant: 'error'
        });
      })
      .finally(() => {
        setIsLoadingButton(false);
        handleClose();
      });
  };

  const handleSubmitRefuse = async () => {
    setIsLoadingButton(true);
    await WithdrawRequestAPI.refuseWithdrawRequest({
      requestId: currentWithdrawRequest?.id!,
      refusalReason: refusalReason!
    })
      .then(async () => {
        enqueueSnackbar('Từ chối thành công', {
          variant: 'success'
        });
        dispatch(getAllWithdrawRequest());
      })
      .catch(() => {
        enqueueSnackbar('Từ chối thất bại', {
          variant: 'error'
        });
      })
      .finally(() => {
        setIsLoadingButton(false);
        handleClose();
      });
  };

  const renderBottomOfModal = () => {
    switch (currentWithdrawRequest?.status) {
      case 'PENDING':
        if (transferStatus === 'success') {
          return (
            <Box my={1}>
              <DialogContentText id="alert-dialog-description">
                <BoldText>Hình ảnh xác nhận đã chuyển thành công:</BoldText>
              </DialogContentText>
              <UploadSingleFile
                accept="image/*"
                file={imageFile}
                maxSize={3145728}
                onDrop={handleDrop}
                preventDropOnDocument
                multiple={false}
              />
            </Box>
          );
        } else {
          return (
            <FormControl>
              <DialogContentText id="alert-dialog-description">
                <BoldText>Lý do từ chối giao dịch</BoldText>
              </DialogContentText>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={refusalReason}
                onChange={handleChangeRefusalReason}
              >
                <FormControlLabel
                  value="Thông tin chuyển tiền sai"
                  control={<Radio />}
                  label="Thông tin chuyển tiền sai"
                />
                <FormControlLabel
                  value="Hệ thống đang bảo trì vui lòng thử lại sau"
                  control={<Radio />}
                  label="Hệ thống đang bảo trì vui lòng thử lại sau"
                />
                <FormControlLabel
                  value="Tên chủ tài khoản không khớp"
                  control={<Radio />}
                  label="Tên chủ tài khoản không khớp"
                />
              </RadioGroup>
            </FormControl>
          );
        }
      case 'PARTIAL':
        return (
          <Box my={1}>
            <img src={currentWithdrawRequest?.description}></img>
          </Box>
        );
      case 'REJECTED':
        return (
          <Box my={1} width={500}>
            <DialogContentText id="alert-dialog-description">
              <BoldText>Lý do từ chối giao dịch</BoldText>
            </DialogContentText>
            <Typography my={1} mx={1} variant="subtitle2" color={'error.main'}>
              - {currentWithdrawRequest?.refusalReason}
            </Typography>
          </Box>
        );
      default:
        break;
    }
  };

  const renderSubmitButton = () => {
    if (currentWithdrawRequest?.status !== 'PENDING') return null;
    if (transferStatus === 'success')
      return (
        <LoadingButton
          disabled={!imageFile}
          onClick={handleSubmitOK}
          loading={isLoadingButton}
          loadingIndicator={<CircularProgress color="primary" size={24} />}
          autoFocus
        >
          Xác nhận giao dịch
        </LoadingButton>
      );
    else {
      return (
        <LoadingButton
          disabled={!refusalReason}
          onClick={handleSubmitRefuse}
          loading={isLoadingButton}
          loadingIndicator={<CircularProgress color="primary" size={24} />}
          autoFocus
          color="error"
        >
          Từ chối giao dịch
        </LoadingButton>
      );
    }
  };

  useEffect(() => {
    dispatch(getAllWithdrawRequest());
  }, [dispatch]);

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0] as File;
    if (file) {
      setImageFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
      setFile(file);
    }
  }, []);

  const getData = (): RowData[] => {
    if (!list) return [];
    return list
      .filter((e) => e.status === filterStatus)
      .sort((a, b) => a.createDate.localeCompare(b.createDate))
      .map<RowData>((_item, _idx) => {
        const status = STATUS_RENDER.find((e) => e.status === _item.status)?.vi;
        return {
          id: _item.id,
          items: [
            {
              name: 'idx',
              value: _idx + 1,
              type: DATA_TYPE.NUMBER
            },
            {
              name: 'accountName',
              value: _item.accountName,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'bankAccount',
              value: _item.bankAccount,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'bankName',
              value: _item.bankName,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'amount',
              value: _item.amount,
              type: DATA_TYPE.CURRENCY
            },
            {
              name: 'refusalReason',
              value: _item.refusalReason ?? 'Không có dữ liệu',
              type: DATA_TYPE.TEXT
            },
            {
              name: 'createDate',
              value: _item.createDate,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'createBy',
              value: _item.createBy,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'status',
              value: status,
              type: DATA_TYPE.CHIP_TEXT,
              textMapColor: [
                { status: 'Chờ xử lý', color: '' },
                { status: 'Đã xác nhận', color: 'success.main' },
                { status: 'Đã từ chối', color: 'error.main' },
                { status: 'Người dùng báo lỗi', color: 'warning.main' }
              ]
            }
          ]
        };
      });
  };
  return (
    <>
      <KrowdTable
        headingTitle="Lệnh rút tiền"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        actionRecord={handleClickOpen}
        action={
          <>
            <Box display={'flex'} width={700} justifyContent={'space-between'}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Box width={400}>
                  <FormControl variant="standard" fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Tra cứu người tạo (nhập ID)"
                      variant="outlined"
                      onChange={getCreateByInfo}
                    />
                  </FormControl>
                </Box>

                <Button onClick={() => searchUser()}>Tìm kiếm</Button>
              </Box>

              <Box width={200}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Lọc theo trạng thái</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterStatus}
                    label="Lọc theo trạng thái"
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value={'PENDING'}>Chờ xử lý</MenuItem>
                    <MenuItem value={'PARTIAL'}>Đã xác nhận</MenuItem>
                    <MenuItem value={'REPORT'}>Người dùng báo lỗi</MenuItem>
                    <MenuItem value={'REJECTED'}>Đã từ chối</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {user && (
              <Typography
                my={1}
                mx={1}
                variant="caption"
              >{`${user.firstName} ${user.lastName}_${user.phoneNum}_${user.email}`}</Typography>
            )}
          </>
        }
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">{'Lệnh rút tiền'}</DialogTitle>
        <DialogContent>
          <Box my={2}>
            <DialogContentText my={1} id="alert-dialog-description">
              <BoldText>Thông tin cần chuyển:</BoldText>
            </DialogContentText>
            <DialogContentText my={1} id="alert-dialog-description">
              <BoldText>- Tên tài khoản:</BoldText> {currentWithdrawRequest?.accountName}
            </DialogContentText>
            <DialogContentText my={1} id="alert-dialog-description">
              <BoldText>- Tên ngân hàng:</BoldText> {currentWithdrawRequest?.bankName}
            </DialogContentText>
            <DialogContentText my={1} id="alert-dialog-description">
              <BoldText>- Số tài khoản:</BoldText> {currentWithdrawRequest?.bankAccount}
            </DialogContentText>
            <DialogContentText my={1} id="alert-dialog-description">
              <BoldText>- Số tiền:</BoldText> {fCurrency(currentWithdrawRequest?.amount!)}
            </DialogContentText>
          </Box>
          {currentWithdrawRequest?.status === 'PENDING' && (
            <Box my={2}>
              <FormControl>
                <DialogContentText id="alert-dialog-description">
                  <BoldText>Trạng thái chuyển:</BoldText>
                </DialogContentText>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={transferStatus}
                  onChange={handleChangeTranferStatus}
                >
                  <FormControlLabel
                    value="success"
                    control={<Radio />}
                    label="Bạn đã chuyển thành công"
                  />
                  <FormControlLabel
                    value="failed"
                    control={<Radio />}
                    label="Bạn không thể chuyển tiền"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          {renderBottomOfModal()}
          {currentWithdrawRequest?.status === 'PENDING' && (
            <Box my={2}>
              <DialogContentText fontSize={12} id="alert-dialog-description">
                Hướng dẫn
              </DialogContentText>
              <DialogContentText fontSize={12} id="alert-dialog-description">
                - Sử dụng tài khoản ngân hàng của Krowd để thực hiện việc chuyển tiền cho người dùng
              </DialogContentText>
              <DialogContentText fontSize={12} id="alert-dialog-description">
                - Cung cấp hình ảnh xác nhận giao dịch thành công giao dịch sau khi chuyển tiền
              </DialogContentText>
              <DialogContentText fontSize={12} id="alert-dialog-description">
                - Yêu cầu này của người dùng sẽ được lưu lại bên phía người dùng để tra cứu sau này
              </DialogContentText>
              <DialogContentText fontSize={12} id="alert-dialog-description">
                - Đọc kĩ thông tin tài khoản trước khi chuyển tiền
              </DialogContentText>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          {renderSubmitButton()}
        </DialogActions>
      </Dialog>
    </>
  );
}
