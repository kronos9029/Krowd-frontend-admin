import closeFill from '@iconify/icons-eva/close-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { Icon } from '@iconify/react';
import { MIconButton } from 'components/@material-extend';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { deleteProjectListById, getAllProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
const STATUS = 'CALLING_FOR_INVESTMENT';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'manager', label: 'QUẢN LÝ', align: 'left' },
  { id: 'investedCapital', label: 'ĐÃ ĐẦU TƯ (VNĐ)', align: 'left' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU (VNĐ)', align: 'left' },
  { id: 'startDate', label: 'NGÀY BẮT ĐÀU', align: 'left' },
  { id: 'endDate', label: 'NGÀY KẾT THÚC', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function CallingProjectTable() {
  const { projectLists, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list } = projectLists;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

  useEffect(() => {
    dispatch(getAllProject('ADMIN'));
  }, [dispatch]);

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
              name: 'manager',
              value: `${_item.manager.firstName} ${_item.manager.lastName}`,
              type: DATA_TYPE.TEXT
            },
            {
              name: 'investedCapital',
              value: _item.investedCapital,
              type: DATA_TYPE.CURRENCY,
              textColor: 'primary.main'
            },
            {
              name: 'investmentTargetCapital',
              value: _item.investmentTargetCapital,
              type: DATA_TYPE.CURRENCY,
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
      headingTitle="Danh sách dự án đang mở đầu tư"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.projects.projectDetails}
    />
  );
}
