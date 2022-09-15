// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  other: getIcon('ic_other'),
  customer: getIcon('ic_customer'),
  business: getIcon('ic_business'),
  project: getIcon('ic_project'),
  wallet: getIcon('ic_wallet'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  dayOverview: getIcon('ic_dayOverview'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  accountTransaction: getIcon('ic_accountTransaction'),
  bankTransaction: getIcon('ic_bankTransaction'),
  PeriodRevenueHistory: getIcon('ic_historyTransaction')
};

const sidebarConfig = [
  {
    subheader: 'ADMIN',
    items: [
      {
        title: 'Ứng dụng',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: 'Quản lý chung',
    items: [{ title: 'Doanh nghiệp', path: PATH_DASHBOARD.business.list, icon: ICONS.business }]
  },
  // MANAGEMENT
  {
    subheader: 'Quản lý người dùng',
    items: [
      {
        title: 'Quản lý doanh nghiệp',
        path: PATH_DASHBOARD.admin.listBusiness,
        icon: ICONS.customer
      },
      {
        title: 'Nhà đầu tư',
        path: PATH_DASHBOARD.admin.listInvestor,
        icon: ICONS.customer
      },
      {
        title: 'Chủ dự án',
        path: PATH_DASHBOARD.admin.listProjectOwner,
        icon: ICONS.customer
      }
    ]
  },
  {
    subheader: 'Quản lý dự án',
    items: [
      { title: 'Tất cả dự án', path: PATH_DASHBOARD.projects.projectKrowd, icon: ICONS.project },
      {
        title: 'Theo từng giai đoạn',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.project,
        children: [
          {
            title: 'Dự án đang chờ duyệt',
            path: PATH_DASHBOARD.projects.draftProject
          },
          {
            title: 'Dự án mở đầu tư',
            path: PATH_DASHBOARD.projects.callingProject
          },

          {
            title: 'Dự án quá hạn đầu tư',
            path: PATH_DASHBOARD.projects.overdateProject
          },
          {
            title: 'Dự án đang hoạt động',
            path: PATH_DASHBOARD.projects.activeProject
          },
          {
            title: 'Dự án đã kết thúc',
            path: PATH_DASHBOARD.projects.closeProject
          }
        ]
      }
    ]
  },

  {
    subheader: 'Quản lý giao dịch',
    items: [
      // {
      //   title: 'Thanh toán giữa các ví',
      //   path: PATH_DASHBOARD.transaction.walletTransaction,
      //   icon: ICONS.accountTransaction
      // }
      {
        title: 'Giao dịch ngân hàng',
        path: PATH_DASHBOARD.transaction.accountTransaction,
        icon: ICONS.bankTransaction
      }
      // {
      //   title: 'Lịch sử doanh thu',
      //   path: PATH_DASHBOARD.transaction.PeriodRevenueHistory,
      //   icon: ICONS.PeriodRevenueHistory
      // }
    ]
  },
  {
    subheader: 'Quản lý khác',
    items: [
      {
        title: 'Quản lý khác',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.other,
        children: [
          { title: 'Lĩnh vực', path: PATH_DASHBOARD.other.fields },
          { title: 'Khu vực', path: PATH_DASHBOARD.other.area },
          { title: 'Vai trò', path: PATH_DASHBOARD.other.role }
          // { title: 'Rủi ro', path: PATH_DASHBOARD.other.risk }
        ]
      }
    ]
  }
];

export default sidebarConfig;
