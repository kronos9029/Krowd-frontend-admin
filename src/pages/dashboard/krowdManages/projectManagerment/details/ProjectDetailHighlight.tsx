import { Icon } from '@iconify/react';
import { Box, Button, Dialog, Divider, Grid, styled, Typography } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';

import parse from 'html-react-parser';
import { useState } from 'react';
import { dispatch } from 'redux/store';
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

type HighlightProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type HighlightListProps = {
  highlights: HighlightProps[];
};
function ProjectDetailHighlight({ highlights }: HighlightListProps) {
  const [openHighLight, setOpenHighLight] = useState(false);
  const [openHighLight2, setOpenHighLight2] = useState(false);

  const getHighLightListByTitle = (title: 'List' | 'Card') => {
    if (!highlights) return;
    return highlights.find((value) => value.title === title);
  };

  const { list } = {
    list: getHighLightListByTitle('List')
  };
  return (
    <>
      {highlights &&
        highlights.length > 0 &&
        highlights.map((v, i) => {
          return (
            <Box key={i}>
              <Typography
                sx={{ pb: 0.1, pr: 5, my: 6 }}
                variant="h6"
                color={'text.secondary'}
                fontWeight={100}
              >
                {list && list.content && <FixQL>{parse(list.content)}</FixQL>}
              </Typography>
            </Box>
          );
        })}
    </>
  );
}
export default ProjectDetailHighlight;
