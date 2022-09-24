import { Box, Chip, Typography } from '@mui/material';
import { Project, PROJECT_STATUS } from '../../../../../@types/krowd/project';
import { MHidden } from 'components/@material-extend';

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
function ProjectDetailHeading({ p }: { p: Project }) {
  return (
    <>
      <Box my={2} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Typography>
          <img style={{ width: '80px' }} src={p.business.image} />
        </Typography>
        <Typography variant="h2">{p.name}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body2" color={'#9E9E9E'}>
          {p.description}
        </Typography>
      </Box>
      <Box my={2} pb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Chip
            label={<Typography variant="overline">{p.field.name}</Typography>}
            variant="filled"
            sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
          />
          <MHidden width="smDown">
            <Chip
              label={<Typography variant="overline">{p.field.description}</Typography>}
              variant="filled"
              sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
            />
          </MHidden>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Chip
            label={
              <Typography variant="overline">
                {StyleStatus.find((e) => e.name === p.status)?.vn}
              </Typography>
            }
            variant="filled"
            sx={{
              bgcolor: StyleStatus.find((e) => e.name === p.status)?.bgcolor,
              borderRadius: '3px',
              color: '#ffffff'
            }}
          />
        </Box>
      </Box>
    </>
  );
}
export default ProjectDetailHeading;
