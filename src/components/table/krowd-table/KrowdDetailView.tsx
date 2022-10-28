import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
// redux
import { useDispatch, useSelector, RootState } from 'redux/store';
// routes
// hooks
// components
import { FieldState, getFieldById } from 'redux/slices/krowd_slices/field';
import FieldNewForm from 'components/_dashboard/other/Field/FieldNewForm';
import {
  BusinessState,
  getBusinessById,
  getTempBusinessById
} from 'redux/slices/krowd_slices/business';
import BusinessNewAccountForm from 'pages/dashboard/krowdManages/businessManagement/BusinessNewAccountForm';
import UserKrowdDetailView from '../manage-user/UserKrowdDetailView';
import { getUserKrowdDetail, UserKrowdState } from 'redux/slices/krowd_slices/users';
import { ROLE_USER_TYPE } from '../../../@types/krowd/users';
// ----------------------------------------------------------------------
export enum VIEW_DETAIL_DATA_TYPE {
  FIELD = '/field',
  BUSINESS = '/business/details',
  INVESTOR_DETAIL = '/investor/details',
  CREATE_TEMP_BUSINESS = '/tempBusiness/new',
  EDIT_TEMP_BUSINESS = '/tempBusiness/details',
  USER_KROWD = '/userKrowd'
}

export default function KrowdDetailView() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id = '' } = useParams();

  const getViewOf =
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.FIELD) && VIEW_DETAIL_DATA_TYPE.FIELD) ||
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.BUSINESS) && VIEW_DETAIL_DATA_TYPE.BUSINESS) ||
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.CREATE_TEMP_BUSINESS) &&
      VIEW_DETAIL_DATA_TYPE.CREATE_TEMP_BUSINESS) ||
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.USER_KROWD) && VIEW_DETAIL_DATA_TYPE.USER_KROWD) ||
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.EDIT_TEMP_BUSINESS) &&
      VIEW_DETAIL_DATA_TYPE.EDIT_TEMP_BUSINESS) ||
    (pathname.includes(VIEW_DETAIL_DATA_TYPE.INVESTOR_DETAIL) &&
      VIEW_DETAIL_DATA_TYPE.INVESTOR_DETAIL);

  const props = useSelector((state: RootState) => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.FIELD:
        return state.fieldKrowd;
      case VIEW_DETAIL_DATA_TYPE.BUSINESS:
        return state.business;
      case VIEW_DETAIL_DATA_TYPE.EDIT_TEMP_BUSINESS: {
        return state.business;
      }
      case VIEW_DETAIL_DATA_TYPE.INVESTOR_DETAIL: {
        return state.userKrowd;
      }
      case VIEW_DETAIL_DATA_TYPE.USER_KROWD: {
        return state.userKrowd;
      }
    }
  });

  const getData = () => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.FIELD: {
        dispatch(getFieldById(id));
        return;
      }
      case VIEW_DETAIL_DATA_TYPE.BUSINESS: {
        dispatch(getBusinessById(id));
        return;
      }
      case VIEW_DETAIL_DATA_TYPE.INVESTOR_DETAIL: {
        dispatch(getUserKrowdDetail(id));
        return;
      }
      case VIEW_DETAIL_DATA_TYPE.EDIT_TEMP_BUSINESS: {
        dispatch(getTempBusinessById(id));
        return;
      }
      case VIEW_DETAIL_DATA_TYPE.USER_KROWD: {
        dispatch(getUserKrowdDetail(id));
        return;
      }
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.FIELD: {
        const { activeFieldId: item, isLoading } = props as FieldState;
        return item && <FieldNewForm currentField={item} />;
      }
      case VIEW_DETAIL_DATA_TYPE.CREATE_TEMP_BUSINESS: {
        return <BusinessNewAccountForm />;
      }
      case VIEW_DETAIL_DATA_TYPE.EDIT_TEMP_BUSINESS: {
        const { tempBusinessState } = props as BusinessState;
        const { tempBusiness: item, isLoading } = tempBusinessState;
        return <BusinessNewAccountForm />;
      }
      case VIEW_DETAIL_DATA_TYPE.USER_KROWD: {
        const { userKrowdDetailState } = props as UserKrowdState;
        const { userKrowdDetail: user, isLoading } = userKrowdDetailState;
        if (user) {
          switch (user.role.name) {
            case ROLE_USER_TYPE.BUSINESS_MANAGER:
              return <UserKrowdDetailView currentKrowd={user} isLoading={isLoading} />;
          }
        }
      }
    }
  };
  useEffect(() => {
    getData();
  }, [dispatch]);

  return <>{renderView()}</>;
}
