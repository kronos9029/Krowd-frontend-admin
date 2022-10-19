import closeFill from '@iconify/icons-eva/close-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { deleteProjectListById, getAllProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
const DRAFT = 'DRAFT';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'left' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'investedCapital', label: 'ĐÃ ĐẦU TƯ (VNĐ)', align: 'left' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU (VNĐ)', align: 'left' },
  { id: 'startDate', label: 'NGÀY BẮT ĐẦU', align: 'left' },
  { id: 'endDate', label: 'NGÀY KẾT THÚC', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function ProjectTable() {
  const { projectLists, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list } = projectLists;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { status = '' } = useParams();

  useEffect(() => {
    dispatch(getAllProject(status));
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
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value:
              (_item.status === 'CLOSED' && 'Đã đóng') ||
              (_item.status === 'ACTIVE' && 'Đã hoàn tất kêu gọi') ||
              (_item.status === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.status === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.status === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.status === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.status === 'DENIED' && 'Đã bị từ chối') ||
              (_item.status === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.status === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.status === 'CALLING_FOR_INVESTMENT' && '#14b7cc') ||
              (_item.status === 'DRAFT' && 'black') ||
              (_item.status === 'WAITING_FOR_APPROVAL' && '#eacb00') ||
              (_item.status === 'WAITING_TO_ACTIVATE' && '#4dc0b5') ||
              (_item.status === 'ACTIVE' && 'green') ||
              (_item.status === 'WAITING_TO_PUBLISH' && '#f66d9b') ||
              (_item.status === 'CLOSED' && '#6574cd') ||
              (_item.status === 'DENIED' && 'red') ||
              (_item.status === 'CALLING_TIME_IS_OVER' ? 'red' : 'black')
          }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Danh sách tất cả dự án"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.projects.projectDetails}
    />
  );
}
