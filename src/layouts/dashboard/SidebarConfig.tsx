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
      // { title: 'Bảng điều khiển', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'Tổng quan ngày', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking }
      // { title: 'Tổng quan tháng', path: PATH_DASHBOARD.general.booking, icon: ICONS.dayOverview }
    ]
  },

  // MANAGEMENT
  {
    subheader: 'Quản lý',
    items: [
      { title: 'Doanh nghiệp', path: PATH_DASHBOARD.business.list, icon: ICONS.business },
      { title: 'Dự án', path: PATH_DASHBOARD.projects.projectKrowd, icon: ICONS.project },
      { title: 'Nhà đầu tư', path: PATH_DASHBOARD.admin.list, icon: ICONS.customer }
      // {
      //   title: 'Quản lý ví',
      //   path: PATH_DASHBOARD.wallet.root,
      //   icon: ICONS.wallet,
      //   children: [
      //     { title: 'Ví của hệ thống', path: PATH_DASHBOARD.wallet.system },
      //     { title: 'Ví doanh thu', path: PATH_DASHBOARD.wallet.transaction },
      //     { title: 'Các loại ví đầu tư', path: PATH_DASHBOARD.wallet.allWallet }
      //   ]
      // }
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
    subheader: '---------------------------------------',
    items: [
      {
        title: 'Quản lý khác:',
        path: PATH_DASHBOARD.other.root,
        icon: ICONS.other,
        children: [
          { title: 'Lĩnh vực', path: PATH_DASHBOARD.other.field },
          { title: 'Khu vực', path: PATH_DASHBOARD.other.area },
          { title: 'Vai trò', path: PATH_DASHBOARD.other.role },
          { title: 'Rủi ro', path: PATH_DASHBOARD.other.risk }
          // { title: 'Đầu tư', path: PATH_DASHBOARD.other.investment }
        ]
      }
    ]
  }
];

export default sidebarConfig;
