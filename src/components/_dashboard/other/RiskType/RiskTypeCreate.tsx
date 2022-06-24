import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from 'redux/store';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { getRiskTypeById } from 'redux/slices/krowd_slices/riskType';
import RiskTypeForm from './RiskTypeForm';

// ----------------------------------------------------------------------

export default function RiskTypeCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const { riskTypeList } = useSelector((state: RootState) => state.riskKrowd);
  const isEdit = pathname.includes('edit');
  const currentRisk = riskTypeList.find((riskType) => paramCase(riskType.id) === id);

  useEffect(() => {
    dispatch(getRiskTypeById(id));
  }, [dispatch]);

  return (
    <Page title="Loại rủi ro: Tạo mới | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo mới loại rủi ro' : 'Cập nhật loại rủi ro'}
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Tạo mới' }]}
        />
        <RiskTypeForm isEdit={isEdit} currentRisk={currentRisk} />
      </Container>
    </Page>
  );
}
