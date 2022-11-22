import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { deleteProjectListById, getAllProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT } from 'routes/paths';
import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import eyeFill from '@iconify/icons-eva/eye-fill';

const STATUS = 'CALLING_TIME_IS_OVER';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'investedCapital', label: 'ĐÃ ĐẦU TƯ (VNĐ)', align: 'right' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU (VNĐ)', align: 'right' },
  { id: 'startDate', label: 'NGÀY BẮT ĐẦU', align: 'center' },
  { id: 'endDate', label: 'NGÀY KẾT THÚC', align: 'center' },
  { id: '', label: 'THAO TÁC', align: 'left' }
];
const action = [
  {
    nameAction: 'view',
    action: PATH_DASHBOARD_PROJECT.project.root,
    icon: eyeFill,
    color: '#14b7cc',
    type: ACTION_TYPE.LINK
  }
];
export default function OverDateProjectTable() {
  const { projectLists, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list, numOfProject } = projectLists;

  const { status = 'CALLING_TIME_IS_OVER' } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // const [status, setStatus] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  useEffect(() => {
    dispatch(getAllProject(status, pageIndex, 5, nameSearch));
  }, [dispatch, pageIndex]);

  const getData = (): RowData[] => {
    if (!list) return [];
    return list
      .filter((_item) => _item.status === STATUS)
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
              name: 'name',
              value: _item.name,
              type: DATA_TYPE.TEXT,
              textColor: 'red'
            },
            {
              name: 'investedCapital',
              value: _item.investedCapital,
              type: DATA_TYPE.NUMBER_FORMAT,
              textColor: 'primary.main'
            },
            {
              name: 'investmentTargetCapital',
              value: _item.investmentTargetCapital,
              type: DATA_TYPE.NUMBER_FORMAT,
              textColor: 'rgb(255, 127, 80)'
            },
            {
              name: 'startDate',
              value: _item.startDate,
              type: DATA_TYPE.DATE
            },
            {
              name: 'endDate',
              value: _item.endDate,
              type: DATA_TYPE.DATE
            }
          ]
        };
      });
  };
  return (
    <KrowdTable
      headingTitle="DỰ ÁN QUÁ HẠN ĐẦU TƯ"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      actionsButton={action}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfProject,

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
// const getMenuItem = (): ItemData[] => {
//   return [
//     {
//       label: 'Xóa dự án',
//       action: handleDeleteProjectById,
//       icon: trash2Outline,
//       type: ITEM_DATA_TYPE.CALLBACK
//     }
//   ] as ItemData[];
// };
