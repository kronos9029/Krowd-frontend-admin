import profileOutlined from '@iconify/icons-ant-design/profile-outlined';
import { Icon } from '@iconify/react';
import { Box, Typography, Link as MuiLink, Grid } from '@mui/material';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { dispatch, RootState } from 'redux/store';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

type DocumentProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type DocumentListProps = {
  documents: DocumentProps[];
};
function ProjectDetailDocument({ documents }: DocumentListProps) {
  //Document

  return (
    <>
      <Box border={'thin double'} borderRadius={1} borderColor="#eee" py={2} px={2} my={3}>
        <Typography variant="body2" color={'text.secondary'} py={2}>
          Tài liệu doanh nghiệp
        </Typography>
        {documents.map((v, i) => (
          <Box display={'flex'} key={i} my={2} height={50} alignItems="center">
            <Grid container>
              <Grid xs={12} sm={6} md={6} lg={6}>
                <MuiLink
                  color={'text.primary'}
                  fontWeight="bold"
                  underline="none"
                  href={v.link || '#'}
                  target="_blank"
                >
                  <Icon icon={profileOutlined} width={30} style={{ marginRight: '15px' }} />
                  {v.title}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
}
export default ProjectDetailDocument;
