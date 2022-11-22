import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { deleteProjectListById, getAllProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT } from 'routes/paths';
import eyeFill from '@iconify/icons-eva/eye-fill';

import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
const STATUS = 'WAITING_FOR_APPROVAL';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'investedCapital', label: 'ĐÃ ĐẦU TƯ (VNĐ)', align: 'left' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU (VNĐ)', align: 'left' },
  { id: 'startDate', label: 'NGÀY BẮT ĐẦU', align: 'left' },
  { id: 'endDate', label: 'NGÀY KẾT THÚC', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
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
export default function WaitingProjectTable() {
  const { projectLists, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list, numOfProject } = projectLists;
  const { status = 'WAITING_FOR_APPROVAL' } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // const [status, setStatus] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  useEffect(() => {
    dispatch(getAllProject(status, pageIndex, 5, nameSearch));
  }, [dispatch, pageIndex]);

  const handleDeleteProjectById = (businessId: string) => {
    dispatch(deleteProjectListById(businessId));
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
              type: DATA_TYPE.TEXT
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
      headingTitle="DỰ ÁN ĐANG CHỜ DUYỆT"
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
