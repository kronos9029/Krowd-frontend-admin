// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  Button,
  Tab,
  Tabs
} from '@mui/material';
import { varFadeInUp, MotionInView } from '../components/animate';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CardMedia from '@mui/material/CardMedia';
// components
import Page from '../components/Page';
import { useState } from 'react';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  justifyContent: 'center'
}));
const ContentStyle = styled(Page)(({ theme }) => ({
  maxWidth: '1500px',
  paddingTop: theme.spacing(10),
  justifyContent: 'center'
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 300,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});
// ----------------------------------------------------------------------

export default function Projects() {
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 13,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#63C1E3' : '#af4cab'
    }
  }));
  return (
    <RootStyle title="Project | Krowd">
      <ContentStyle>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              orientation="vertical"
            >
              <Tab
                value="one"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Quán cà phê
                  </Typography>
                }
              />
              <Tab
                value="two"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Quán trà sữa
                  </Typography>
                }
              />
              <Tab
                value="three"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Cửa hàng ăn nhanh
                  </Typography>
                }
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} style={{ zIndex: -10 }}>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 5, sm: 8, md: 12 }}>
              {Array.from(new Array(6)).map((_, index) => {
                let totalBudget = Math.floor(Math.random() * 100000000);
                let currentBudget = Math.floor(Math.random() * totalBudget);
                let ratio = Math.floor((currentBudget / totalBudget) * 100);
                return (
                  <Grid key={`${value} ${index}`} item xs={12} sm={8} md={5}>
                    <MotionInView variants={varFadeInUp}>
                      <CardStyle sx={{ maxWidth: 390 }}>
                        <CardMedia
                          style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                          component="img"
                          height="194"
                          image="/static/components/Hot-Bussiness-KFC.png"
                        />
                        <Typography
                          sx={{
                            color: isLight ? '#14B7CC' : 'white',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            paddingTop: '1rem',
                            textAlign: 'center'
                          }}
                          variant="h5"
                          paragraph
                        >
                          Dự án KFC quận {index + 1}
                        </Typography>
                        <Typography
                          style={{ textAlign: 'left' }}
                          sx={{
                            color: isLight ? '#251E18' : 'black',
                            textOverflow: 'ellipsis',
                            // whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6
                          }}
                        >
                          Với vị trí dự án nằm ở trung tâm quận {index + 1} thu hút một số lượng
                          khách ưa chuộng đồ ăn nhanh. Đây hứa hẹn sẽ là dự án nóng cho các nhà đầu
                          tư có niềm đam mê về ăn uống.
                        </Typography>
                        <BorderLinearProgress variant="determinate" value={ratio} />
                        <Typography
                          paragraph
                          sx={{
                            color: isLight ? '#251E18' : 'black',
                            paddingTop: '1rem'
                          }}
                        >
                          <strong> {fCurrency(currentBudget)} </strong> trên{' '}
                          <strong> {fCurrency(totalBudget)} </strong>
                        </Typography>
                      </CardStyle>
                    </MotionInView>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </ContentStyle>
    </RootStyle>
  );
}
