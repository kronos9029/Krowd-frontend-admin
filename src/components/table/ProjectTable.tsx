import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllProject } from 'redux/slices/krowd_slices/project';
import { dispatch, RootState, useSelector } from 'redux/store';
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT } from 'routes/paths';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { Box, FormControl, TextField } from '@mui/material';
const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Khi duyệt dự án ADMIN vui lòng kiểm tra đầy đủ các thông tin thiết yếu của dự án(Tên, Ảnh, số tiên kêu gọi,....)'
  },
  {
    name: 'Kiểm tra và kích hoạt những dự án vói những dự án (Đang chờ kích hoạt)'
  }
];
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'TÊN DỰ ÁN', align: 'center' },
  { id: 'investedCapital', label: 'ĐÃ ĐẦU TƯ', align: 'center' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU', align: 'center' },
  { id: 'startDate', label: 'NGÀY BẮT ĐẦU', align: 'center' },
  { id: 'endDate', label: 'NGÀY KẾT THÚC', align: 'center' },
  { id: 'createDate', label: 'NGÀY TẠO', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'center' },
  { id: '', label: '', align: 'center' }
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

export default function ProjectTable() {
  const { projectLists, isLoading } = useSelector((state: RootState) => state.project);
  const { listOfProject: list, numOfProject } = projectLists;
  const { status = '' } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  // const [status, setStatus] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  useEffect(() => {
    dispatch(getAllProject(status, pageIndex, 8, nameSearch));
  }, [dispatch, pageIndex, nameSearch]);
  const getProjectByName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setNameSearch(id ?? nameSearch);
  };
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
            value: _item.startDate.toString().substring(0, 10),
            type: DATA_TYPE.DATE
          },
          {
            name: 'endDate',
            value: _item.endDate.toString().substring(0, 10),
            type: DATA_TYPE.DATE
          },
          {
            name: 'createDate',
            value: _item.createDate.toString().substring(0, 10),
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value:
              (_item.status === 'CLOSED' && 'Đã đóng') ||
              (_item.status === 'ACTIVE' && 'Đang hoạt động') ||
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
      action={
        <Box mx={2} width={400}>
          <FormControl variant="standard" fullWidth>
            <TextField
              id="outlined-basic"
              label="Tra cứu dự án (nhập tên)"
              variant="outlined"
              onChange={getProjectByName}
            />
          </FormControl>
        </Box>
      }
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      actionsButton={action}
      noteTable={note}
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
