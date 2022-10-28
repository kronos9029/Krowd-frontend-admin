import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { getProjectByBusinessID } from 'redux/slices/krowd_slices/business';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'left' },
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'left' },
  { id: 'field', label: 'LĨNH VỰC', align: 'left' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];
type ProjectsOfBusinessTableProps = {
  id: string;
  businessName: string;
};
export default function ProjectsOfBusinessTable({
  id,
  businessName
}: ProjectsOfBusinessTableProps) {
  const { projectsOfBusinessState } = useSelector((state: RootState) => state.business);
  const { projectsOfBusiness, isLoading } = projectsOfBusinessState;
  const { listOfProject: list } = projectsOfBusiness;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getProjectByBusinessID(id, 'ADMIN'));
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
            name: 'id',
            value: _item.id,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },
          // {
          //   name: 'manager',
          //   value: `${_item.manager.firstName} ${_item.manager.lastName}`,
          //   type: DATA_TYPE.TEXT
          // },
          {
            name: 'field',
            value: _item.field.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'createDate',
            value: _item.createDate,
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
      headingTitle={`Danh sách dự án của ${businessName}`}
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      viewPath={PATH_DASHBOARD.projects.projectDetails}
    />
  );
}
