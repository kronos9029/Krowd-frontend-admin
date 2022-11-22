import {
  Grid,
  CardMedia,
  Box,
  Typography,
  CardActionArea,
  Card,
  alpha,
  Chip,
  Link
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInUp } from 'components/animate';
import { useState } from 'react';
import { fCurrency } from 'utils/formatNumber';

import { All_Project_Admin } from '../../../@types/krowd/project';
import { PATH_DASHBOARD } from 'routes/paths';
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    margin: 'auto',
    textAlign: 'left',
    marginBottom: theme.spacing(5),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.2)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.15)}`
    },
    [theme.breakpoints.up('xs')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8'
    }
  };
});
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#14B7CC'
  }
}));

function ProjectCardAdmin({ row }: { row: All_Project_Admin }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Grid sx={{ p: 2 }} item key={row.id} xs={12} sm={12} md={6} lg={4}>
      <MotionInView variants={varFadeInUp}>
        <Link
          href={`${PATH_DASHBOARD.projects.projectDetails}/${row.id}`}
          style={{ textDecoration: 'none' }}
        >
          <CardStyle
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            sx={{
              width: 360,
              maxHeight: 500,
              height: 500
            }}
          >
            <CardActionArea>
              <Card
                sx={{
                  minWidth: 50,
                  minHeight: 50,
                  boxShadow: '20px 40px 80px 0 20%',
                  position: 'absolute',
                  top: isHover ? '39%' : '42%',
                  left: '5%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img style={{ width: '4em' }} src={row.businessImage} />
              </Card>
              <CardMedia
                style={{
                  display: 'center'
                }}
                component="img"
                height={240}
                src={row.image}
              />
              <Box px={3}>
                <Box minHeight={'10em'}>
                  <Typography
                    sx={{
                      color: 'text.primary',
                      overflow: 'hidden',
                      paddingTop: '1.8rem',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1
                    }}
                    variant="subtitle1"
                  >
                    {row.name}
                  </Typography>
                  <Typography
                    style={{ textAlign: 'left' }}
                    sx={{
                      color: '#251E18',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 5
                    }}
                    variant="body2"
                  >
                    {row.description}
                  </Typography>
                </Box>
                <Box mt={isHover ? 3 : 2}>
                  <Box sx={{ display: !isHover ? 'block' : 'none' }}>
                    <Box>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{
                          color: 'text.disabled',
                          marginBottom: '0.3rem',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1
                        }}
                      >
                        {row.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Chip
                        label={<Typography variant="caption">{row.fieldName}</Typography>}
                        variant="filled"
                        sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
                      />
                      <Chip
                        label={<Typography variant="caption">{row.fieldDescription}</Typography>}
                        variant="filled"
                        sx={{ ml: 1, borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: isHover ? 'block' : 'none' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        paragraph
                        sx={{
                          color: '#251E18',
                          marginBottom: '0.2rem'
                        }}
                      >
                        <strong>Đã đầu tư</strong>
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          color: '#251E18',
                          marginBottom: '0.2rem'
                        }}
                      >
                        <strong>Mục tiêu kêu gọi</strong>
                      </Typography>
                    </Box>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(row.investedCapital / row.investmentTargetCapital) * 100}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '0.2rem'
                      }}
                    >
                      <Typography
                        paragraph
                        sx={{
                          color: '#14B7CC'
                        }}
                      >
                        <strong>{fCurrency(row.investedCapital)}</strong>
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          color: '#FF7F56'
                        }}
                      >
                        <strong>{fCurrency(row.investmentTargetCapital)}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardActionArea>
          </CardStyle>
        </Link>
      </MotionInView>
    </Grid>
  );
}
export default ProjectCardAdmin;
