import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Stack,
  styled,
  Typography
} from '@mui/material';
import { fCurrency } from 'utils/formatNumber';
// import { ProjectDetailAlbumCarousel } from 'components/_external-pages/project-detail/index';
import { PATH_DASHBOARD } from 'routes/paths';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { dispatch, RootState, useSelector } from 'redux/store';
import {
  approveProject,
  getProjectListById,
  getProjectPackage
} from 'redux/slices/krowd_slices/project';
import Page from 'components/Page';
import { Container } from '@mui/system';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { useSnackbar } from 'notistack';
import ProjectDetailHeading from './ProjectDetailHeading';
import { MHidden } from 'components/@material-extend';
import { PROJECT_STATUS } from '../../../../../@types/krowd/project';
import starFilled from '@iconify/icons-ant-design/star-filled';
import ProjectDetailHighlight from './ProjectDetailHighlight';
import ProjectDetailPitch from './ProjectDetailPitch';
import ProjectDetailExtension from './ProjectDetailExtension';
import ProjectDetailDocument from './ProjectDetailDocument';
import ProjectDetailAbout from './ProjectDetailAbout';
import ProjectDetailPress from './ProjectDetailPress';
import ProjectDetailFAQs from './ProjectDetailFAQs';

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
const StyleStatus = [
  { name: PROJECT_STATUS.DRAFT, bgcolor: 'primary.main', vn: 'BẢN NHÁP' },
  {
    name: PROJECT_STATUS.WAITING_FOR_APPROVAL,
    bgcolor: 'primary.main',
    vn: 'Đang chờ duyệt'
  },
  {
    name: PROJECT_STATUS.CALLING_FOR_INVESTMENT,
    bgcolor: 'primary.main',
    vn: 'Đang kêu gọi đầu tư'
  },
  { name: PROJECT_STATUS.ACTIVE, bgcolor: 'primary.success', vn: 'KÊU GỌI THÀNH CÔNG' }
];

export default function ProjectKrowdAdminDetails() {
  const { id = '' } = useParams();
  useEffect(() => {
    dispatch(getProjectListById(id));
    dispatch(getProjectPackage(id));
  }, [dispatch]);
  const { projectDetail: project } = useSelector((state: RootState) => state.project);
  const { isLoading, packageLists } = useSelector((state: RootState) => state.project);

  const [open, setOpen] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSubmit = () => {
    setOpenSubmit(true);
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
  };
  const handleSubmitProject = () => {
    dispatch(approveProject(id));
    enqueueSnackbar('Duyệt thành công', {
      variant: 'success'
    });
    setOpenSubmit(false);
  };

  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ABOUT' | 'HIGHLIGHT' | 'FAQ' | 'PRESS' | ''
  ) => {
    return project?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  const { pitchs, extensions, documents, abouts, highlights, faqs, press } = {
    pitchs: getEntityList('PITCH'),
    extensions: getEntityList('EXTENSION'),
    documents: getEntityList('DOCUMENT'),
    abouts: getEntityList('ABOUT'),
    faqs: getEntityList('FAQ'),
    highlights: getEntityList('HIGHLIGHT'),
    press: getEntityList('PRESS')
  };
  return (
    <Page title="Chi tiết: Dự án | Krowd">
      <Container maxWidth={false}>
        <Box my={2} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Typography>
            <img style={{ width: '80px' }} src={project?.business.image} />
          </Typography>
          <Typography variant="h2">{project?.name}</Typography>
        </Box>
        <Box my={2}>
          <Typography variant="body2" color={'#9E9E9E'}>
            {project?.description}
          </Typography>
        </Box>
        <Box my={2} pb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Chip
              label={<Typography variant="overline">{project?.field.name}</Typography>}
              variant="filled"
              sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
            />
            <MHidden width="smDown">
              <Chip
                label={<Typography variant="overline">{project?.field.description}</Typography>}
                variant="filled"
                sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
              />
            </MHidden>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Chip
              label={
                <Typography variant="overline">
                  {StyleStatus.find((e) => e.name === project?.status)?.vn}
                </Typography>
              }
              variant="filled"
              sx={{
                bgcolor: StyleStatus.find((e) => e.name === project?.status)?.bgcolor,
                borderRadius: '3px',
                color: '#ffffff'
              }}
            />
          </Box>
        </Box>
        <HeaderBreadcrumbs
          heading="Chi tiết Dự án"
          links={[
            { name: 'Dự án', href: PATH_DASHBOARD.projects.projectKrowd },
            { name: `${project?.name}` }
          ]}
          action={
            <Box>
              {project?.status === 'WAITING_FOR_APPROVAL' && (
                <>
                  <Button variant="contained" onClick={handleClickOpen} color={'error'}>
                    Từ chối
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClickOpenSubmit}
                    startIcon={<Icon icon={checkmarkFill} />}
                    color={'primary'}
                    sx={{ ml: 1 }}
                  >
                    Duyệt dự án{' '}
                  </Button>
                  <Dialog
                    open={openSubmit}
                    onClose={handleClickOpenSubmit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <DialogTitle>Bạn có muốn duyệt dự án</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleCloseSubmit}>Đóng</Button>
                      <Button type="submit" variant="contained" onClick={handleSubmitProject}>
                        Lưu
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Box>
          }
        />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Thông tin chung:
        </Typography>
        <Grid container>
          <Grid
            px={{ lg: 0, md: 0, sm: 5, xs: 2 }}
            sx={{ pr: 5 }}
            py={{ lg: 0, md: 3, sm: 3 }}
            item
            xs={12}
            sm={12}
            md={7}
            lg={8}
          >
            <img style={{ width: '100%' }} src={project?.image} />

            {/* {album && <ProjectDetailAlbumCarousel album={album} />} */}
          </Grid>
          <Grid
            px={{ lg: 5, md: 5, sm: 5, xs: 2 }}
            py={{ lg: 5, md: 3, sm: 3, xs: 3 }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={4}
          >
            <Box sx={{ my: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem'
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
                  <strong>Mục tiêu</strong>
                </Typography>
              </Box>
              <BorderLinearProgress
                variant="determinate"
                value={
                  (project &&
                    (project?.investedCapital / project?.investmentTargetCapital) * 100) ??
                  0
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  my: '0.5rem'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#14B7CC'
                  }}
                >
                  <strong>{fCurrency(`${project?.investedCapital}`)}</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#FF7F56'
                  }}
                >
                  <strong> {fCurrency(`${project?.investmentTargetCapital}`)}</strong>
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.sharedRevenue}
                <span>%</span>
                <Typography color="text.disabled" variant="subtitle2">
                  Doanh thu chia sẻ
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                <span>x</span>
                {project?.multiplier}
                <Typography color="text.disabled" variant="subtitle2">
                  Hệ số nhân
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.duration} <span> tháng </span>
                <Typography color="text.disabled" variant="subtitle2">
                  Thanh toán đầu tư
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ color: 'text.disabled' }} />

            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
                {project?.numOfStage} <span> kì</span>
                <Typography color="text.disabled" variant="subtitle2">
                  Số kì thanh toán
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Card sx={{ pt: 5, px: 5, mt: 5 }}>
          {/* All project entity */}
          <Grid container justifyContent="space-between">
            {/* HightLight entity */}
            <Grid xs={12} sm={7} md={6} lg={8}>
              <Typography variant="h4" sx={{ mr: 3 }} color={'#666'} height={50}>
                <Icon
                  icon={starFilled}
                  style={{
                    marginRight: 10,
                    marginBottom: 5,
                    color: '#14B7CC'
                  }}
                />
                Nổi bật
              </Typography>
              {highlights && highlights.length > 0 && (
                <ProjectDetailHighlight highlights={highlights} />
              )}
              <Grid>
                <Grid container sx={{ mt: 7 }}>
                  <Grid xs={12} sm={9} md={9} lg={9}>
                    <Typography variant="h4" color={'#666'} height={50}>
                      <Icon
                        icon={starFilled}
                        style={{
                          marginRight: 10,
                          marginBottom: 5,
                          color: '#14B7CC'
                        }}
                      />
                      Tiêu điểm dự án
                      <Box width={'7%'}>
                        <Divider variant="fullWidth" sx={{ my: 1, opacity: 0.1 }} />
                      </Box>
                    </Typography>{' '}
                  </Grid>
                </Grid>
                {pitchs && pitchs.length > 0 && <ProjectDetailPitch pitchs={pitchs} />}
              </Grid>
              <Box width={'33%'}>
                <Divider variant="fullWidth" sx={{ my: 1, opacity: 0.1 }} />
              </Box>
            </Grid>
            <Grid xs={12} sm={4} md={5} lg={4}>
              {/* Extension entity */}
              <Grid container>
                <Grid>
                  <Typography variant="h4" sx={{ mt: 0.1 }} color={'#666'}>
                    Thông tin mở rộng
                  </Typography>
                  <Box width={'15%'}>
                    <Divider variant="fullWidth" sx={{ my: 1 }} />
                  </Box>
                </Grid>
              </Grid>
              {extensions && extensions.length > 0 && (
                <ProjectDetailExtension extensions={extensions} />
              )}

              {/* Document entity */}
              <Grid container sx={{ mt: 7 }}>
                <Grid>
                  <Typography variant="h5" color={'#666'}>
                    Tài liệu dự án
                  </Typography>
                  <Box width={'15%'}>
                    <Divider variant="fullWidth" sx={{ my: 1 }} />
                  </Box>
                </Grid>
              </Grid>
              {documents && documents.length > 0 && <ProjectDetailDocument documents={documents} />}
              <Grid sx={{ my: 5 }}>
                <Typography variant="h5" color={'#666'}>
                  Gói đầu tư
                </Typography>
                <Box width={'15%'}>
                  <Divider variant="fullWidth" sx={{ my: 1 }} />
                </Box>
                <Grid>
                  <Card
                    sx={{
                      width: '20em',
                      display: 'flex',
                      position: 'relative',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: 3
                    }}
                  >
                    <Grid sx={{ mt: 1, my: 3 }}>
                      {packageLists.listOfPackage &&
                        packageLists.listOfPackage.length > 0 &&
                        packageLists.listOfPackage.map((e, index) => (
                          <Grid sx={{ p: 2 }} item key={index} xs={12} sm={12} md={12} lg={12}>
                            <Typography
                              variant="overline"
                              sx={{
                                display: 'flex',
                                color: 'text.secondary',
                                justifyContent: 'center'
                              }}
                            >
                              {e.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                              {index === 1 || index === 2 ? (
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: 'text.secondary' }}
                                ></Typography>
                              ) : (
                                ''
                              )}
                              <Typography variant="h4" sx={{ mx: 1 }}>
                                {e.price === 0 ? 'Free' : fCurrency(e.price)}
                              </Typography>
                              {index === 1 || index === 2 ? (
                                <Typography
                                  gutterBottom
                                  component="span"
                                  variant="subtitle2"
                                  sx={{
                                    alignSelf: 'flex-end',
                                    color: 'text.secondary'
                                  }}
                                ></Typography>
                              ) : (
                                ''
                              )}
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                textTransform: 'capitalize',
                                justifyContent: 'center',
                                display: 'flex'
                              }}
                            >
                              (VND)
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'primary.main',
                                textTransform: 'capitalize',
                                justifyContent: 'center',
                                display: 'flex'
                              }}
                            >
                              Số lượng {e.quantity}
                            </Typography>

                            <Stack
                              paddingLeft={0}
                              textAlign={'left'}
                              component="ul"
                              spacing={2}
                              sx={{ my: 5, width: 1 }}
                            >
                              {e.descriptionList.map((item, i) => (
                                <Stack
                                  key={i}
                                  component="li"
                                  direction="row"
                                  alignItems="center"
                                  spacing={1.5}
                                  sx={{
                                    typography: 'body2'
                                  }}
                                >
                                  <Box
                                    component={Icon}
                                    icon={checkmarkFill}
                                    sx={{ width: 20, height: 20 }}
                                  />
                                  <Typography variant="body2">{item}</Typography>
                                </Stack>
                              ))}
                            </Stack>

                            <Divider sx={{ my: 3 }} variant="fullWidth" />
                          </Grid>
                        ))}
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ pt: 5, px: 5, mt: 5 }}>
          <Box mb={7}>
            <Typography textAlign="center" py={1} color={'#666'} variant="h4">
              Về chúng tôi
            </Typography>
            <Box mx="auto" width={'10%'}>
              <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
            </Box>
          </Box>
          <Grid>
            <Box
              mx={'auto'}
              mb={2}
              sx={{
                position: 'relative',
                width: '200px',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '50%'
              }}
            >
              <img src={project?.business.image} style={{ width: '100%', height: 'auto' }} />
            </Box>

            <Typography
              variant="h4"
              textAlign={'center'}
            >{` ${project?.manager.firstName} ${project?.manager.lastName}`}</Typography>
            <Typography textAlign={'center'} py={1} color={'text.disabled'} variant="body1">
              Quản lý dự án
            </Typography>
          </Grid>
          <ProjectDetailAbout abouts={abouts} />
          <ProjectDetailPress press={press} />
          {/* {user?.role === ROLE_USER_TYPE.PROJECT_MANAGER && project.status === 'DRAFT' && ( */}
          <Box>
            <Divider variant="fullWidth" sx={{ my: 5 }} />
          </Box>{' '}
          <ProjectDetailFAQs faqs={faqs} />
          <Typography sx={{ mt: 5 }} />
        </Card>
      </Container>
    </Page>
  );
}
