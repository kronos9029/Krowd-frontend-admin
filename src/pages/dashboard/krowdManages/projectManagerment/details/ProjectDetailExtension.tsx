import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  styled,
  Typography
} from '@mui/material';
import exclamationCircleOutlined from '@iconify/icons-ant-design/exclamation-circle-outlined';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { dispatch, RootState } from 'redux/store';

import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
const AccordionStyle = styled(Accordion)(() => ({
  '&.noBorder': {
    boxShadow: 'none',
    paddingLeft: 0
  }
}));
type ExtensionProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
  priority: number;
};
type ExtensionListProps = {
  extensions: ExtensionProps[];
};
function ProjectDetailExtension({ extensions }: ExtensionListProps) {
  const [expanded, setExpanded] = useState(-1);
  const [openExtension, setOpenExtension] = useState(false);
  const [openExtension2, setOpenExtension2] = useState(false);

  const { user } = useAuth();

  const handleChange = (panel: number, isCollapse: boolean) => {
    if (isCollapse || panel === -1) setExpanded(panel);
  };
  return (
    <>
      <Box>
        {extensions.map((v, i) => {
          const isHaveDescription = v.description !== null;
          const isExpanded = expanded === i;
          return (
            <Box key={i} my={1}>
              <Grid container>
                <Grid lg={11}>
                  <AccordionStyle
                    elevation={0}
                    expanded={isExpanded}
                    onMouseOver={() => handleChange(i, isHaveDescription)}
                    classes={{ root: 'noBorder' }}
                    onMouseLeave={() => handleChange(-1, isHaveDescription)}
                  >
                    <AccordionSummary id={v.title} sx={{ p: 0 }}>
                      <Box>
                        <Box display={'flex'} alignItems={'flex-end'}>
                          <Typography variant="body2">{v.title}</Typography>
                          {isHaveDescription && (
                            <Typography
                              ml={1}
                              color={isExpanded ? 'primary.main' : 'text.secondary'}
                            >
                              <Icon icon={exclamationCircleOutlined} width={17} />
                            </Typography>
                          )}
                        </Box>
                        <Typography variant="body1" fontWeight={'bold'} mt={1}>
                          {v.content}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    {isHaveDescription && (
                      <AccordionDetails sx={{ p: 0 }}>
                        <Typography>{v.description}</Typography>
                      </AccordionDetails>
                    )}
                  </AccordionStyle>
                </Grid>
              </Grid>

              <Box width={'50%'}>
                <Divider sx={{ color: 'text.disabled', my: 0.5 }} variant="fullWidth" />
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
export default ProjectDetailExtension;
