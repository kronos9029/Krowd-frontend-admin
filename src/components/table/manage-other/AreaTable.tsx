import { useEffect, useState } from 'react';
import { getAreasList } from 'redux/slices/krowd_slices/area';
import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
const FOCUS_AREA_CITY = 'Hồ Chí Minh';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'city', label: 'THÀNH PHỐ', align: 'left' },
  { id: 'district', label: 'QUẬN', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'updateDate', label: 'NGÀY CẬP NHẬT', align: 'left' },
  { id: '', label: '', align: 'left' }
];

export default function AreaTable() {
  const { areaList: list, isLoading } = useSelector((state: RootState) => state.areaKrowd);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getAreasList(1, 1000));
  }, [dispatch]);

  const getData = (): RowData[] => {
    if (!list) return [];
    return list
      .filter((_item) => _item.city === FOCUS_AREA_CITY)
      .map<RowData>((_item, _idx) => {
        return {
          id: _item.id,
          items: [
            {
              name: 'idx',
              value: _idx + 1,
              type: DATA_TYPE.NUMBER
            },
            {
              name: 'city',
              value: _item.city,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'district',
              value: _item.district,
              type: DATA_TYPE.TEXT
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
      headingTitle="khu vực thành phố Hồ Chí Minh"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      // paging={{
      //   pageIndex,
      //   pageSize: pageSize,
      //   numberSize: 100,

      //   handleNext() {
      //     setPageIndex(pageIndex + 1);
      //   },
      //   handlePrevious() {
      //     setPageIndex(pageIndex - 1);
      //   }
      // }}
    />
  );
}
