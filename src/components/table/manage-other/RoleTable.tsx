import { useState, useEffect } from 'react';
// material
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// components
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { getRolesList } from 'redux/slices/krowd_slices/roles';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN', align: 'left' },
  { id: 'description', label: 'MÔ TẢ', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'updateDate', label: 'NGÀY CẬP NHẬT', align: 'left' }
];
export default function RoleTable() {
  const { rolesList: list, isLoading } = useSelector((state: RootState) => state.roleKrowd);

  useEffect(() => {
    dispatch(getRolesList());
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
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.WRAP_TEXT
          },

          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'updateDate',
            value: _item.updateDate,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="các vai trò trong hệ thống"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
    />
  );
}
