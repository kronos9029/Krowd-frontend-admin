// material
import { Skeleton, Grid } from '@mui/material';
import KrowdProjectCard from './KrowdProjectCard';
// import { Product } from '../../../../@types/projects';
import { Project } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(12)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

type ShopProductListProps = {
  projects: Project[];
  isLoad: boolean;
};

export default function KrowdProjectList({ projects, isLoad, ...other }: ShopProductListProps) {
  return (
    <Grid container spacing={3} {...other}>
      {projects.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <KrowdProjectCard product={product} />
        </Grid>
      ))}

      {isLoad && SkeletonLoad}
    </Grid>
  );
}
