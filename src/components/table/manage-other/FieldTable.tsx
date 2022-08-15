import { useState, useEffect } from 'react';
// material
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// components
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN', align: 'left' },
  { id: 'description', label: 'MÔ TẢ', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'createBy', label: 'NGƯỜI TẠO', align: 'left' },
  { id: 'updateDate', label: 'NGÀY CẬP NHẬT', align: 'left' },
  { id: 'updateBy', label: 'NGƯỜI CẬP NHẬT', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];
export default function FieldTable() {
  const { fieldList: list, isLoading } = useSelector((state: RootState) => state.fieldKrowd);

  useEffect(() => {
    dispatch(getFieldList());
  }, [dispatch]);

  //   const handleDeleteFieldById = (activeFieldId: string) => {
  //     dispatch(delFieldListById(activeFieldId));
  //     enqueueSnackbar('Cập nhật trạng thái thành công', {
  //       variant: 'success',
  //       action: (key) => (
  //         <MIconButton size="small" onClick={() => closeSnackbar(key)}>
  //           <Icon icon={closeFill} />
  //         </MIconButton>
  //       )
  //     });
  //   };
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
            name: 'updateDate',
            value: _item.updateDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'updateBy',
            value: _item.updateBy,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Danh sách các loại lĩnh vực"
      createNewRecordButton={{
        pathTo: PATH_DASHBOARD.other.field + '/new',
        label: 'Tạo mới lĩnh vực'
      }}
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.other.field}
    />
  );
}
