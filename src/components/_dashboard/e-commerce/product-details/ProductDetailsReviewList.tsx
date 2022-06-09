import { Icon } from '@iconify/react';
import { useState } from 'react';
import roundThumbUp from '@iconify/icons-ic/round-thumb-up';
import roundVerified from '@iconify/icons-ic/round-verified';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { styled } from '@mui/material/styles';

// material
import {
  Box,
  List,
  Button,
  Rating,
  Avatar,
  ListItem,
  Pagination,
  Typography,
  Grid
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
import { Product, ProductReview } from '../../../../@types/products';

// ----------------------------------------------------------------------
const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`
    }
  }
}));
function ReviewItem({ review }: { review: ProductReview }) {
  const [isHelpful, setHelpfuls] = useState(false);
  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid key={review.id} item xs={12} sm={6} md={3}>
          <ListItem
            disableGutters
            sx={{
              mb: 5,
              alignItems: 'flex-start',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Box
              sx={{
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 2, sm: 0 },
                minWidth: { xs: 160, md: 240 },
                textAlign: { sm: 'center' },
                flexDirection: { sm: 'column' }
              }}
            >
              <Avatar
                src={avatarUrl}
                sx={{
                  mr: { xs: 2, sm: 0 },
                  mb: { sm: 2 },
                  width: { md: 64 },
                  height: { md: 64 }
                }}
              />
              <div>
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                  {fDate(postedAt)}
                </Typography>
              </div>
            </Box>
          </ListItem>
        </Grid>
      </Grid>
    </>
  );
}

type ProductDetailsReviewListProps = {
  product: Product;
};

export default function ProjectDetailsReviewList({ product }: ProductDetailsReviewListProps) {
  const { reviews } = product;

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <Box sx={{ pt: 3, px: 2, pb: 5, textAlign: 'center', fontWeight: '900' }}>
        Danh sách các thành viên trong dự án
      </Box>
      <Grid sx={{ display: 'flex' }} container spacing={6}>
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </Grid>
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </Grid>
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </Grid>
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
