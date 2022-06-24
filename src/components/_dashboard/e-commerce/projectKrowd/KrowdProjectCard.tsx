import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../../Label';

import { Project } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type KrowdProjectCardProps = {
  product: Project;
};

export default function KrowdProjectCard({ product }: KrowdProjectCardProps) {
  const { name, image, remainAmount, areaId, status, sharedRevenue } = product;
  const linkTo = `${PATH_DASHBOARD.projects.root}/project/${paramCase(name)}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> type here */}
          {areaId}
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(remainAmount)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
