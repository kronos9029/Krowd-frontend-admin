import SimpleBar, { Props } from 'simplebar-react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import { createRef } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
}));

const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

// ----------------------------------------------------------------------

export default function Scrollbar({ children, sx, ...other }: BoxProps & Props) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }
  const scrollableNodeRef = createRef<SimpleBar>();
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other} ref={scrollableNodeRef}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
