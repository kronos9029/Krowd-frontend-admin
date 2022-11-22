import { KrowdTable, RowData, DATA_TYPE } from 'components/table/krowd-table/KrowdTable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/users';
import { dispatch, RootState, useSelector } from 'redux/store';
const TABLE_HEAD = [
  { id: 'description', label: 'NỘI DUNG', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'right' },
  { id: 'type', label: 'LOẠI', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'left' }
];

export default function WalletInvestorTransactionTable() {
  const { walletTransactionState } = useSelector((state: RootState) => state.userKrowd);
  const {
    isLoading,
    listOfWalletTransaction: list,
    numOfWalletTransaction
  } = walletTransactionState;
  const { id = '' } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getWalletTransactionList(id, pageIndex, 5));
  }, [dispatch, pageIndex]);

  console.log(list);
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'description',
            value:
              (_item.description === 'Deposit money into I1 wallet' &&
                'Nạp tiền vào VÍ TẠM THỜI của bạn') ||
              (_item.description === 'Transfer money from I1 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Receive money from I1 wallet to I2 wallet' &&
                'Nhận tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Transfer money from I4 wallet to I5 wallet' &&
                'Chuyển tiền từ VÍ DỰ ÁN THANH TOÁN sang VÍ THU TIỀN của bạn') ||
              (_item.description === 'Transfer money from I5 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ THU TIỀN sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Withdraw money out of I1 wallet' &&
                'Rút tiền từ VÍ TẠM THỜI') ||
              (_item.description ===
                'Transfer money from I3 wallet to P3 wallet to prepare for activation' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description === 'Receive money from I2 wallet to I3 wallet to invest' &&
                'Nhận tiền đầu tư từ VÍ ĐẦU TƯ CHUNG của bạn sang VÍ TẠM ỨNG của bạn') ||
              (_item.description === 'Transfer money from I2 wallet to I3 wallet to invest' &&
                'Chuyển tiền đầu tư từ VÍ ĐẦU TƯ CHUNG của bạn sang VÍ TẠM ỨNG') ||
              (_item.description ===
                'Recieve money from I3 wallet to P3 wallet to prepare for activation' &&
                'Nhận tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description ===
                'Receive money from I3 wallet to P3 wallet for stage payment' &&
                'Nhận tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN cho giai đoạn') ||
              (_item.description ===
                'Transfer money from I3 wallet to P3 wallet to for stage payment' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description ===
              'Transfer money from I3 wallet to P3 wallet to for stage payment'
                ? 'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN'
                : 'Đang cập nhật nội dung'),
            type: DATA_TYPE.TEXT
          },

          {
            name: 'amount',
            value:
              _item.type === 'CASH_IN' || _item.type === 'DEPOSIT'
                ? `+ ${_item.amount}`
                : `- ${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.type === 'CASH_IN' || _item.type === 'DEPOSIT' ? 'green' : 'red'
          },
          {
            name: 'type',
            value:
              (_item.type === 'CASH_IN' && 'Tiền vào') ||
              (_item.type === 'CASH_OUT' && 'Tiền ra') ||
              (_item.type === 'DEPOSIT' && 'Nạp tiền') ||
              (_item.type === 'WITHDRAW' && 'Rút tiền'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.type === 'CASH_IN' && 'green') ||
              (_item.type === 'CASH_OUT' && 'red') ||
              (_item.type === 'DEPOSIT' && 'green') ||
              (_item.type === 'WITHDRAW' ? 'red' : 'green')
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
      headingTitle="DANH SÁCH GIAO DỊCH VÍ"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfWalletTransaction,

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
