import { useState } from 'react';
// material
import { Divider, Collapse } from '@mui/material';
//
import ProductDetailsReviewForm from './ProductDetailsReviewForm';
import ProjectDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';
import { Product } from '../../../../@types/products';
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

// ----------------------------------------------------------------------

type ProductDetailsReviewProps = {
  product: Product;
};

export default function ProjectDetailsReview({ product }: ProductDetailsReviewProps) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <ProjectDetailsReviewList product={product} />
      </Grid>
    </>
  );
}
