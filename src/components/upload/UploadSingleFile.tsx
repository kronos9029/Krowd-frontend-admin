import { isString } from 'lodash';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Theme, Typography, Paper } from '@mui/material';
import { SxProps } from '@mui/system';
// utils
import { fData } from '../../utils/formatNumber';
//
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadSingleFileProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  sx?: SxProps<Theme>;
}

export default function UploadSingleFile({
  error = false,
  file,
  sx,
  ...other
}: UploadSingleFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(!file && { padding: '10% 2%' })
        }}
      >
        <input {...getInputProps()} />
        {!file && (
          <>
            <UploadIllustration sx={{ width: 220 }} />
            <Box sx={{ p: 3, ml: { md: 2 } }}>
              <Typography gutterBottom variant="h5">
                Drop or Select file
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Drop files here or click&nbsp;
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: 'primary.main', textDecoration: 'underline' }}
                >
                  browse
                </Typography>
                &nbsp;thorough your machine
              </Typography>
            </Box>
          </>
        )}

        {file && (
          <Box
            component="img"
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              borderRadius: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
