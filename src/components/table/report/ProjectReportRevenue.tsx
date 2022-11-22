import { useEffect, useState } from 'react';
import { Box, Button, Card } from '@mui/material';

import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { getDailyReportProjectID } from 'redux/slices/krowd_slices/transaction';

import ProjectBillDailyReport from './ProjectBillDailyReport';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'reportDate', label: 'NGÀY BÁO CÁO', align: 'center' },
  { id: 'updateBy', label: 'CẬP NHẬT', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: '', label: '', align: 'center' }
];

const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Khi tới hạn báo cáo bạn mới có thể đăng tải file lên.'
  },
  {
    name: 'Dữ liệu sẽ được thay đổi nếu bạn đã đăng tải một file trước đó rồi.'
  }
];
export default function ProjectReportRevenue() {
  const { dailyReportState, dailyReportDetails } = useSelector(
    (state: RootState) => state.transaction
  );
  const { isLoading, listOfDailyReport: list, numOfDailyReport } = dailyReportState;
  const { DailyDetails: details } = dailyReportDetails;

  const [pageIndex, setPageIndex] = useState(1);

  const [pageSize, setPageSize] = useState(8);

  const projectId = localStorage.getItem('projectId');

  useEffect(() => {
    dispatch(getDailyReportProjectID(localStorage.getItem('projectId') ?? '', pageIndex ?? 1));
  }, [pageIndex]);

  const [openBillDaily, setOpenKrowdBillDaily] = useState(false);

  const handleClickOpenBill = async () => {
    setOpenKrowdBillDaily(true);
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
            name: 'reportDate',
            value: _item.reportDate.toString().substring(0, 11),
            type: DATA_TYPE.DATE
          },

          {
            name: 'updateBy',
            value:
              (_item.updateBy === 'Client' && 'Đã cập nhật qua KROWD') ||
              (_item.updateBy === null && 'Chưa cập nhật'),
            type: DATA_TYPE.TEXT_FORMAT
          },
          {
            name: 'amount',
            value: `${_item.amount} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle="BÁO CÁO DOANH THU HẰNG NGÀY"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        openBill={() => handleClickOpenBill()}
        noteTable={note}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfDailyReport,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
      />
      {openBillDaily && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color={'error'}
              onClick={() => setOpenKrowdBillDaily(false)}
            >
              Đóng lại
            </Button>
          </Box>
          <ProjectBillDailyReport />
        </Card>
      )}
    </>
  );
}
