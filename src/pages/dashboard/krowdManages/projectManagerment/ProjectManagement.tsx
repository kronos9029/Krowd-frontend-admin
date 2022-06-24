import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import { Backdrop, Container, Typography, CircularProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import fakeRequest from '../../../../utils/fakeRequest';
// @types
import { Project, ProjectFilter, ProjectState } from '../../../../@types/krowd/project';

// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  KrowdProjectSort,
  KrowdProjectList,
  KrowdFilterSidebar
} from '../../../../components/_dashboard/e-commerce/projectKrowd';
import { ProjectSearch } from 'components/_dashboard/blog';
import { filterProducts, getAllProject } from 'redux/slices/krowd_slices/project';

// ----------------------------------------------------------------------

function applyFilter(products: Project[], sortBy: string | null, filters: ProjectFilter) {
  // SORT BY
  if (sortBy === 'newest') {
    products = orderBy(products, ['createDate'], ['desc']);
  }
  if (sortBy === 'ZtoA') {
    products = orderBy(products, ['name'], ['desc']);
  }
  if (sortBy === 'AtoZ') {
    products = orderBy(products, ['name'], ['asc']);
  }
  // FILTER Project
  if (filters.status?.length > 0) {
    products = filter(products, (_product) => includes(filters.status, _product.status));
  }
  if (filters.areaId !== 'HCM') {
    return filter(products, (_product) => includes(filters.areaId, _product.areaId));
  }

  return products;
}

export default function ProjectKrowd() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  //state of project
  const { projects, sortBy, filters } = useSelector(
    (state: { product: ProjectState }) => state.product
  );

  const filteredProducts = applyFilter(projects, sortBy, filters);

  //Use project filter
  const formik = useFormik<ProjectFilter>({
    initialValues: {
      areaId: '',
      status: filters.status
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await getAllProject('ADMIN');
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  const isDefault = values.areaId?.length === 0 && values.status?.length === 0;

  //get project
  useEffect(() => {
    dispatch(getAllProject('ADMIN'));
  }, [dispatch]);
  //get filter projects
  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dự án: Danh sách | Krowd">
      {values && (
        <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách các dự án"
          links={[{ name: 'Danh sách', href: PATH_DASHBOARD.root }]}
        />

        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {filteredProducts.length}
            </Typography>
            &nbsp;Dự án tìm thấy
          </Typography>
        )}
        <ProjectSearch />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <ShopTagFiltered
            filters={filters}
            formik={formik}
            isShowReset={openFilter}
            onResetFilter={handleResetFilter}
            isDefault={isDefault}
          />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <KrowdFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <KrowdProjectSort />
          </Stack>
        </Stack>

        <KrowdProjectList
          projects={filteredProducts}
          isLoad={!filteredProducts && !initialValues}
        />
        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}
