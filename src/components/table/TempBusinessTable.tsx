import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { getAllTempBusiness } from 'redux/slices/krowd_slices/business';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'uid', label: 'UID', align: 'left' },
  { id: 'name', label: 'TÊN DOANH NGHIỆP', align: 'left' },
  { id: 'email', label: 'EMAIL', align: 'left' },
  { id: 'password', label: 'MẬT KHẨU KHỞI TẠO', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function BusinessTable() {
  const { tempBusinessState } = useSelector((state: RootState) => state.business);
  const { tempBusinessList: list, isLoading } = tempBusinessState;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getAllTempBusiness());
  }, [dispatch]);

  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item) => {
      return {
        id: _item.uid,
        items: [
          {
            name: 'uid',
            value: _item.uid,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'name',
            value: _item.displayName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'email',
            value: _item.email,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'password',
            value: _item.password,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Các doanh nghiệp chưa công khai"
      createNewRecordButton={{
        pathTo: PATH_DASHBOARD.business.newUser,
        label: 'Tạo mới doanh nghiệp'
      }}
      header={TABLE_HEAD}
      getData={getData}
      deleteRecord={() => {}}
      isLoading={isLoading}
    />
  );
}
