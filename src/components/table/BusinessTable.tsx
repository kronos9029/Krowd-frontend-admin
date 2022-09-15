import { BUSINESS_STATUS_ENUM } from '../../@types/krowd/business';
import { useEffect } from 'react';
import { getBusinessList } from 'redux/slices/krowd_slices/business';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: '' },
  { id: 'name', label: 'TÊN DOANH NGHIỆP', align: 'left' },
  { id: 'fieldList.name', label: 'THUỘC LOẠI', align: 'left' },
  { id: 'numOfProject', label: 'SỐ DỰ ÁN', align: 'center' },
  { id: 'numOfSuccessfulProject', label: 'DỰ ÁN HOÀN THÀNH', align: 'center' },
  { id: 'successfulRate', label: 'TỈ LỆ THÀNH CÔNG', align: 'center' },
  { id: 'createDate', label: 'NGÀY CÔNG KHAI', align: 'left' },
  { id: 'manager.firstName', label: 'NGƯỜI ĐẠI DIỆN', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

const BUSINESS_STATUS = [{ status: BUSINESS_STATUS_ENUM.ACTIVE, color: 'rgb(102, 187, 106)' }];
export default function BusinessTable() {
  const { businessState } = useSelector((state: RootState) => state.business);
  const { businessLists, isLoading } = businessState;
  const { listOfBusiness: list } = businessLists;

  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);

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
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'numOfSuccessfulProject',
            value: _item.numOfSuccessfulProject,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'successfulRate',
            value: _item.successfulRate,
            type: DATA_TYPE.NUMBER
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
            type: DATA_TYPE.CHIP_TEXT,
            textMapColor: BUSINESS_STATUS
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
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.business.details}
    />
  );
}
