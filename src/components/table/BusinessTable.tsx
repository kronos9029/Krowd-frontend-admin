import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { delBusinessListById, getBusinessList } from 'redux/slices/krowd_slices/business';
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
  const { businessLists, isLoading } = useSelector((state: RootState) => state.business);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getBusinessList('ADMIN'));
  }, [dispatch]);

  const handleDeleteBusinessById = (activeBussinessId: string) => {
    dispatch(delBusinessListById(activeBussinessId));
    enqueueSnackbar('Cập nhật trạng thái thành công', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

  const { listOfBusiness } = businessLists;
  const getData = (): RowData[] => {
    if (!listOfBusiness) return [];
    return listOfBusiness.map<RowData>((business) => {
      return {
        id: business.id,
        items: [
          {
            name: 'image',
            value: business.image,
            type: DATA_TYPE.IMAGE
          },
          {
            name: 'name',
            value: business.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'field',
            value: business.fieldList.map((_field) => _field.name),
            type: DATA_TYPE.LIST_TEXT
          },
          {
            name: 'numOfProject',
            value: business.numOfProject,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'numOfSuccessfulProject',
            value: business.numOfSuccessfulProject,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'successfulRate',
            value: business.successfulRate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'createDate',
            value: business.createDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'managerName',
            value: `${business.manager.firstName} ${business.manager.lastName}`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value: business.status,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Các doanh nghiệp chính thức"
      createNewRecordButton={{
        pathTo: PATH_DASHBOARD.business.newUser,
        label: 'Tạo mới doanh nghiệp'
      }}
      header={TABLE_HEAD}
      getData={getData}
      viewPath={PATH_DASHBOARD.business.details}
      deleteRecord={handleDeleteBusinessById}
      isLoading={isLoading}
    />
  );
}
