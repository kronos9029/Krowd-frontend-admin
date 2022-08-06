import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { deleteBusinessById, getBusinessList } from 'redux/slices/krowd_slices/business';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'image', label: 'HÌNH ẢNH', align: 'left' },
  { id: 'name', label: 'TÊN DOANH NGHIỆP', align: 'left' },
  { id: 'fieldList.name', label: 'THUỘC LOẠI', align: 'left' },
  { id: 'numOfProject', label: 'SỐ DỰ ÁN', align: 'left' },
  { id: 'numOfSuccessfulProject', label: 'DỰ ÁN HOÀN THÀNH', align: 'left' },
  { id: 'successfulRate', label: 'TỈ LỆ THÀNH CÔNG', align: 'left' },
  { id: 'createDate', label: 'NGÀY CÔNG KHAI', align: 'left' },
  { id: 'manager.firstName', label: 'NGƯỜI ĐẠI DIỆN', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function BusinessTable() {
  const { businessState } = useSelector((state: RootState) => state.business);
  const { businessLists, isLoading } = businessState;
  const { listOfBusiness: list } = businessLists;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getBusinessList('ADMIN'));
  }, [dispatch]);

  const handleDeleteBusinessById = (businessId: string) => {
    dispatch(deleteBusinessById(businessId));
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item) => {
      return {
        id: _item.id,
        items: [
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
            type: DATA_TYPE.TEXT
          },
          {
            name: 'numOfSuccessfulProject',
            value: _item.numOfSuccessfulProject,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'successfulRate',
            value: _item.successfulRate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'managerName',
            value: `${_item.manager.firstName} ${_item.manager.lastName}`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value: _item.status,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Các doanh nghiệp chính thức"
      header={TABLE_HEAD}
      getData={getData}
      viewPath={PATH_DASHBOARD.business.details}
      deleteRecord={handleDeleteBusinessById}
      isLoading={isLoading}
    />
  );
}
