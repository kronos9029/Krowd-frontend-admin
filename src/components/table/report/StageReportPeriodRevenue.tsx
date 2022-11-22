import { useEffect, useState } from 'react';
import { Typography, Box, Tooltip, Card, Divider } from '@mui/material';
import total from '@iconify/icons-eva/text-outline';
import time from '@iconify/icons-eva/clock-outline';
import done from '@iconify/icons-eva/checkmark-circle-2-outline';
import paytime from '@iconify/icons-eva/bell-outline';
import warning from '@iconify/icons-eva/bell-fill';

import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';

import { useSnackbar } from 'notistack';
import { fCurrency } from 'utils/formatNumber';
import { getAllProjectStage } from 'redux/slices/krowd_slices/stage';
import { Icon } from '@iconify/react';

import Scrollbar from 'components/Scrollbar';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'GIAI ĐOẠN', align: 'left' },
  { id: 'actualAmount', label: 'DOANH THU THỰC TẾ', align: 'right' },
  { id: 'paidAmount', label: 'SỐ TIỀN ĐÃ TRẢ', align: 'right' },
  { id: 'sharedAmount', label: 'DOANH THU CHIA SẺ', align: 'right' },
  { id: 'isOverDue', label: 'TÌNH TRẠNG THANH TOÁN', align: 'left' },
  { id: 'endDate', label: 'THỜI GIAN THANH TOÁN', align: 'left' },
  { id: 'endDate', label: 'TRẠNG THÁI', align: 'left' }
];
const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Khi kỳ hạn tới thời hạn thanh toán bạn mới có thể thanh toán tiền cho các nhà đầu tư'
  },
  {
    name: 'Bạn không cần thiết phải thanh toán một lần mà có thể thanh toán nhiều lần (Bạn chỉ có thể thanh toán trong vòng 3 ngày)'
  },
  {
    name: 'Số tiền bạn thanh toán phải bằng với doanh thu chia sẻ'
  },
  {
    name: 'Mọi thông tin bạn chưa nắm rõ có thể liên hệ với admin'
  }
];
const STATUS_ENUM = {
  ALL: '',
  UNDUE: 'UNDUE',
  DUE: 'DUE',
  INACTIVE: 'INACTIVE',
  DONE: 'DONE'
};

export default function StageReportPeriodRevenue() {
  const { isLoading, projectStageList } = useSelector((state: RootState) => state.stage);
  const { listOfStage: list, numOfStage, filterCount } = projectStageList;

  // const { walletList } = useSelector((state: RootState) => state.wallet);
  // const { listOfProjectWallet } = walletList;
  // const walletId = listOfProjectWallet?.p4List.find(
  //   (e: any) => e.projectId === localStorage.getItem('projectId')
  // );
  const { projectDetail } = useSelector((state: RootState) => state.project);
  const { stageDetail } = useSelector((state: RootState) => state.stage);
  const { StageId } = stageDetail;
  const projectId = localStorage.getItem('projectId');

  const { enqueueSnackbar } = useSnackbar();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  // const status = actionFilter.find((e) => e.nameAction === 'Chưa tới hạn');

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      getAllProjectStage(
        localStorage?.getItem('projectId') ?? 'null',
        pageIndex ?? 1,
        localStorage.getItem('statusReport') ?? 'DUE'
      )
    );
    // dispatch(getProjectId(`${localStorage.getItem('projectId')}`));
  }, [dispatch, pageIndex, localStorage.getItem('statusReport')]);

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
            value: `${_item.name}`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'actualAmount',
            value: fCurrency(_item.actualAmount),
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'paidAmount',
            value: fCurrency(_item.paidAmount),
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'sharedAmount',
            value: fCurrency(_item.sharedAmount),
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'isOverDue',
            value:
              (_item.isOverDue === 'TRUE' && 'Đã quá hạn') ||
              (_item.isOverDue === 'FALSE' && 'Tới thời hạn thanh toán') ||
              (_item.isOverDue === null && _item.status === 'DONE' && 'Đã xong') ||
              (_item.isOverDue === null && _item.status === 'DUE' && 'Đang cập nhật') ||
              (_item.isOverDue === null && 'Chưa tới hạn'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.isOverDue === null && _item.status === 'DONE' && 'green') ||
              (_item.isOverDue === 'FALSE' && '#14b7cc') ||
              (_item.isOverDue === null && _item.status === 'DUE' && '#14b7cc') ||
              (_item.isOverDue === null && '#fc980b') ||
              (_item.isOverDue === 'TRUE' ? 'red' : 'black')
          },
          {
            name: 'endDate',
            value: `${
              _item.name === 'Giai đoạn thanh toán nợ'
                ? '**/**/****'
                : _item.endDate.toString().substring(0, 10)
            }`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value:
              (_item.status === 'DONE' && 'Đã xong') ||
              (_item.status === 'DUE' && 'Tới thời gian thanh toán') ||
              (_item.status === 'UNDUE' && 'Chưa tới thời gian thanh toán') ||
              (_item.status === 'INACTIVE' && 'Chưa hoạt động'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.status === 'DONE' && 'green') ||
              (_item.status === 'DUE' && '#14b7cc') ||
              (_item.status === 'UNDUE' && '#fc980b') ||
              (_item.status === 'INACTIVE' ? 'red' : 'black')
          }
        ]
      };
    });
  };
  return (
    <>
      {' '}
      <Scrollbar sx={{ mb: 4 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 5,
            width: '1500px',
            minWidth: 1000
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={total} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>TẤT CẢ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                Tổng {numOfStage} kỳ
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />{' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={warning} height={40} width={40} color={'red'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'red' }}>
                CHƯA KÍCH HOẠT
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.inactive} kỳ chưa kích hoạt{' '}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={time} height={40} width={40} color={'#fc980b'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#fc980b' }}>
                CHƯA TỚI HẠN
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.undue} kỳ chưa tới hạn
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={paytime} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>
                TỚI THỜI HẠN THANH TOÁN
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.due} kỳ tới thời hạn
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={done} height={40} width={40} color={'green'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'green' }}>ĐÃ XONG</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.done} kỳ
              </Typography>
              {/* <Typography sx={{ py: 0.5 }}>
                <span style={{ fontWeight: 700 }}> Đã thanh toán:</span>{' '}
                {fCurrency(projectDetail.DetailsProjectprojectDetail?.paidAmount ?? '')}
              </Typography>
              <Typography sx={{ py: 0.5, fontWeight: 500 }}>
                <span style={{ fontWeight: 700 }}> Còn lại: </span>{' '}
                {fCurrency(
                  (projectDetailBYID.projectDetail &&
                    projectDetailBYID.projectDetail?.investmentTargetCapital *
                      projectDetailBYID.projectDetail?.multiplier -
                      projectDetailBYID.projectDetail?.paidAmount) ??
                    ''
                )}{' '}
              </Typography>{' '} */}
            </Box>
          </Box>
        </Card>
      </Scrollbar>
      <KrowdTable
        headingTitle={`thống kê giai đoạn các kỳ`}
        // filterStatus={actionFilter}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        noteTable={note}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfStage,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
      />
    </>
  );
}
