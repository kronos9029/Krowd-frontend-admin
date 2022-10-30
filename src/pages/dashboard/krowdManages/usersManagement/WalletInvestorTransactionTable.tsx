import {
  KrowdInvestorDetailTable,
  RowData,
  DATA_TYPE
} from 'components/table/krowd-table/KrowdInvestorDetailTable';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/users';
import { dispatch, RootState, useSelector } from 'redux/store';
const TABLE_HEAD = [
  //   { id: 'fromUserId', label: 'TỪ', align: '' },
  //   { id: 'payType', label: 'LOẠI HÌNH THANH TOÁN', align: 'center' },
  { id: 'id', label: 'MÃ GIAO DỊCH VÍ', align: 'left' },
  // { id: 'type', label: 'LOẠI', align: 'left' },

  //   { id: 'orderId', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  // { id: 'fee', label: 'PHÍ GIAO DỊCH', align: 'left' },

  { id: 'description', label: 'NỘI DUNG', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'left' }
  // { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function WalletInvestorTransactionTable() {
  const { walletTransactionState } = useSelector((state: RootState) => state.userKrowd);
  const {
    isLoading,
    listOfWalletTransaction: list,
    numOfWalletTransaction
  } = walletTransactionState;
  const { id = '' } = useParams();
  useEffect(() => {
    dispatch(getWalletTransactionList(id));
  }, [dispatch]);

  console.log(list);
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'id',
            value: _item.id,
            type: DATA_TYPE.TEXT
          },

          // {
          //   name: 'type',
          //   value: _item.type === 'CASH_IN' ? 'Tiền vào' : 'Tiền ra',
          //   type: DATA_TYPE.TEXT,
          //   textColor: _item.type === 'CASH_IN' ? 'green' : 'red'
          // },

          {
            name: 'amount',
            value: _item.type === 'CASH_IN' ? `+ ${_item.amount}` : `- ${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.type === 'CASH_IN' ? 'green' : 'red'
          },
          // {
          //   name: 'fee',
          //   value: `${_item.fee} %`,
          //   type: DATA_TYPE.TEXT_FORMAT
          // },
          {
            name: 'description',
            value:
              (_item.description === 'Receive money from I1 wallet to I2 wallet' &&
                'Nhận tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description === 'Transfer money from I1 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description === 'Deposit money into I1 wallet' &&
                'Nạp tiền vào VÍ TẠM THỜI') ||
              (_item.description === 'Receive money from I2 wallet to I3 wallet to invest' &&
                'Nhận tiền đầu tư từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.description === 'Transfer money from I2 wallet to I3 wallet to invest' &&
                'Chuyển tiền đầu tư từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.description ===
                'Receive money from I3 wallet to P3 wallet to prepare for activation' &&
                'Nhận tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN của chủ dự án') ||
              (_item.description ===
                'Transfer money from I3 wallet to P3 wallet to prepare for activation' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN của chủ dự án'),
            type: DATA_TYPE.TEXT
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
    <KrowdInvestorDetailTable
      headingTitle="DANH SÁCH GIAO DỊCH VÍ"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}
