// routes
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import { ROLE_USER_TYPE } from '../../@types/krowd/users';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  business: getIcon('ic_business'),
  project: getIcon('ic_project'),
  wallet: getIcon('ic_wallet'),
  dayOverview: getIcon('ic_dayOverview'),
  banking: getIcon('ic_banking'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  accountTransaction: getIcon('ic_accountTransaction'),
  bankTransaction: getIcon('ic_bankTransaction'),
  daily: getIcon('ic_dailyRevenue'),
  customer: getIcon('ic_customer'),

  term: getIcon('ic_termRevenue'),
  PeriodRevenueHistory: getIcon('ic_historyTransaction')
};

const SidebarProjectConfig = [
  {
    subheader: 'Dự án',
    items: [
      {
        title: `Chi tiết dự án`,
        path: PATH_DASHBOARD_PROJECT.project.root,
        icon: ICONS.dashboard
      }
    ]
  },

  {
    subheader: 'Quản lý đầu tư',
    items: [
      {
        title: 'Lịch sử đầu tư',
        path: PATH_DASHBOARD_PROJECT.project.Project_Investment,
        icon: ICONS.accountTransaction
      }
    ]
  },
  {
    subheader: 'Báo cáo dự án',
    items: [
      {
        title: 'Doanh thu hằng ngày',
        path: PATH_DASHBOARD_PROJECT.project.reportRevenue,
        icon: ICONS.daily
      },

      {
        title: 'Giai đoạn thanh toán',
        path: PATH_DASHBOARD_PROJECT.project.stageReport,
        icon: ICONS.term
      }
    ]
  }
];

export default SidebarProjectConfig;
