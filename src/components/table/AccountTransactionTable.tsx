import { useState, useEffect } from 'react';
// material
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// components
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getAccountTransactionList } from 'redux/slices/krowd_slices/transaction';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/users';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'orderType', label: 'PHƯƠNG THỨC', align: 'left' },
  { id: 'orderType', label: 'ID NGƯỜI THỰC HIỆN', align: 'left' },
  { id: 'transId', label: 'MÃ GIAO DỊCH', align: 'center' },
  { id: 'type', label: 'LOẠI GIAO DỊCH', align: 'left' },
  { id: 'message', label: 'TRẠNG THÁI', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'right' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' },
  { id: 'createDate', label: '', align: 'center' }
];

export default function AccountTransactionTable() {
  const { accountTransactionList, isLoading } = useSelector(
    (state: RootState) => state.transaction
  );
  const { userKrowdDetailState: userState } = useSelector((state: RootState) => state.userKrowd);
  const { userKrowdDetail: user } = userState;
  const { listOfAccountTransaction: list, numOfAccountTransaction } = accountTransactionList;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    dispatch(getAccountTransactionList('', '', pageIndex, 5));
  }, [dispatch, pageIndex]);
  const [idUser, setIdUser] = useState<string | null>(null);
  const getCreateByInfo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setIdUser(id ?? idUser);
    setUserId(id ?? idUser);
  };
  const searchUser = async () => {
    if (idUser) dispatch(getUserKrowdDetail(idUser));
  };
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
            name: 'orderType',
            value: '',
            type: DATA_TYPE.ICONS
          },
          {
            name: 'fromUserId',
            value: _item.fromUserId,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(20, 183, 204)'
          },
          {
            name: 'transId',
            value: _item.transId,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(20, 183, 204)'
          },
          {
            name: 'type',
            value: _item.type === 'Top-up' ? 'Nạp tiền vào ví' : 'Thất bại',
            type: DATA_TYPE.TEXT,
            textColor: _item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red'
          },

          {
            name: 'message',
            value: _item.message,
            type: DATA_TYPE.LABLE
          },
          {
            name: 'amount',
            value:
              _item.message === 'Giao dịch thành công.' ? `${_item.amount}` : `${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red'
          },
          {
            name: 'createDate',
            value: _item.createDate.toString().substring(0, 11),
            type: DATA_TYPE.DATE,
            textColor: 'rgb(102, 187, 106)'
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Giao dịch ngân hàng"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      action={
        <>
          <Box display={'flex'} width={700} justifyContent={'space-between'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box width={450}>
                <FormControl variant="standard" fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="Tra cứu người tạo (nhập đầy đủ ID)"
                    variant="outlined"
                    onChange={getCreateByInfo}
                  />
                </FormControl>
              </Box>

              <Button onClick={() => searchUser()}>Tìm kiếm</Button>
            </Box>
          </Box>
          {user && (
            <Typography my={1} mx={1} variant="body2">
              Người gửi yêu cầu: {`${user.firstName} ${user.lastName}`} <br />
              SĐT: {user.phoneNum}
              <br />
              Email: {user.email}
            </Typography>
          )}
        </>
      }
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfAccountTransaction,

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
