import { Icon } from '@iconify/react';
import { Box, Button, Divider, Grid, styled, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

const FixQL = styled('div')(() => ({
  '.ql-align-center': {
    textAlign: 'center'
  },
  '.ql-align-right': {
    textAlign: 'right'
  },
  '.ql-align-justify': {
    textAlign: 'justify'
  },
  blockquote: {
    background: '#f9f9f9',
    borderLeft: '10px solid #ccc',
    margin: '1.5em 10px',
    padding: '0.5em 10px',
    quotes: '201C 201D 2018 2019'
  },
  'blockquote:before': {
    color: '#ccc',
    content: 'open-quote',
    fontSize: '4em',
    lineHeight: '0.1em',
    marginRight: '0.25em',
    verticalAlign: '-0.4em'
  },
  'blockquote p': {
    display: 'inline'
  },
  '.ql-video': {
    width: '100%',
    height: '500px'
  }
}));
const NavbarTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));
const NavbarBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '10px',
  visibility: 'hidden'
}));
const NavbarTopClickAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
}));
type PitchProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type PitchListProps = {
  pitchs: PitchProps[];
};
function ProjectDetailPitch({ pitchs }: PitchListProps) {
  const [openPitch, setOpenPitch] = useState(
    pitchs.map((_p) => {
      return {
        id: _p.id,
        open: false
      };
    }) ?? [{ id: '', open: false }]
  );
  const [openDeletePitch, setDeletePitch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <>
      {pitchs &&
        pitchs.map(
          (v, i) =>
            v && (
              <Box key={i} my={5} py={0.4}>
                <Grid container>
                  <Box pb={2}>
                    <Typography variant="h4" color={'#666'} height={50}>
                      {`${i + 1}. ${v.title}`}
                      <Box width={'10%'}>
                        <NavbarTopClickAnchor
                          id={`__navbarTopClick_${v.id}`}
                        ></NavbarTopClickAnchor>
                        <Divider variant="fullWidth" sx={{ my: 1, opacity: 0.1 }} />
                      </Box>
                    </Typography>
                  </Box>
                  <Grid xs={12} sm={11} md={11} lg={11}>
                    {v.content && <FixQL>{parse(v.content)}</FixQL>}
                  </Grid>
                </Grid>
              </Box>
            )
        )}
    </>
  );
}
export default ProjectDetailPitch;
