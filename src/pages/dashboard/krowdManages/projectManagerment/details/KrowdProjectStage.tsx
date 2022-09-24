import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField, Typography } from '@mui/material';
//
import { dispatch, RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { Project } from '../../../../../@types/krowd/project';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
import { BaseOptionChart } from 'components/charts';

// ----------------------------------------------------------------------

export default function KrowdProjectStage({ project }: { project: Project }) {
  const [seriesData, setSeriesData] = useState('Biểu đồ số tiền doanh thu từng kỳ');

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(String(event.target.value));
    window.scrollTo(700, document.body.scrollHeight);
  };

  const { listOfChartStage, isLoading } = useSelector((state: RootState) => state.project);
  // console.log(listOfChartStage);

  // console.log('chartList', listOfChartStage.length);
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        'Kỳ 1',
        'Kỳ 2',
        'Kỳ 3',
        'Kỳ 4',
        'Kỳ 5',
        'Kỳ 6',
        'Kỳ 7',
        'Kỳ 8',
        'Kỳ 9',
        'Kỳ 10',
        'Kỳ 11',
        'Kỳ 12',
        'Kỳ 13',
        'Kỳ 14',
        'Kỳ 15',
        'Kỳ 16',
        'Kỳ 17',
        'Kỳ 18',
        'Kỳ 19',
        'Kỳ 20',
        'Kỳ 21',
        'Kỳ 22',
        'Kỳ 23',
        'Kỳ 24',
        'Kỳ 25'
      ]
    }
  });

  return (
    <>
      {/* {isLoading && ( */}
      <HeaderBreadcrumbs
        heading={'BIỂU ĐỒ CỦA DỰ ÁN'}
        links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Danh sách' }]}
      />
      <Card style={{ marginTop: 20, marginBottom: 40 }}>
        <CardHeader
          title="Thống kê tăng trưởng"
          // subheader="(+43%) than last year"
          action={
            <TextField
              select
              fullWidth
              value={seriesData}
              SelectProps={{ native: true }}
              onChange={handleChangeSeriesData}
              sx={{
                '& fieldset': { border: '0 !important' },
                '& select': {
                  pl: 1,
                  py: 0.5,
                  pr: '24px !important',
                  typography: 'subtitle2'
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0.75,
                  bgcolor: 'background.neutral'
                },
                '& .MuiNativeSelect-icon': {
                  top: 4,
                  right: 0,
                  width: 20,
                  height: 20
                }
              }}
            >
              {listOfChartStage &&
                listOfChartStage.length > 0 &&
                listOfChartStage.map((option) => (
                  <option key={option.chartName} value={option.chartName}>
                    {option.chartName}
                  </option>
                ))}
              {/* {CHART_DATA.map((option) => (
              <option key={option.chartName} value={option.chartName}>
                {option.chartName}
              </option>
            ))} */}
            </TextField>
          }
        />
        {/* {listStage &&
        listStage.map((item) => (
          <Box key={item.chartName} sx={{ mt: 3, mx: 3 }} dir="ltr">
            {item.chartName === 'PeriodRevenue_Ratio_Chart' && (
              <ReactApexChart
                type="line"
                series={item.lineList}
                options={chartOptions}
                height={364}
              />
            )}
          </Box>
        ))} */}
        {listOfChartStage &&
          listOfChartStage.length > 0 &&
          listOfChartStage.map((item) => (
            <Box key={item.chartName} sx={{ mt: 3, mx: 3 }} dir="ltr">
              {item.chartName === seriesData && (
                <ReactApexChart
                  type="line"
                  series={item.lineList}
                  options={chartOptions}
                  height={364}
                />
              )}
            </Box>
          ))}
      </Card>
      {/* )} */}
    </>
  );
}
