// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  other: getIcon('ic_other'),
  business: getIcon('ic_business'),
  project: getIcon('ic_project'),
  wallet: getIcon('ic_wallet'),
  investor: getIcon('ic_investor'),
  manager: getIcon('ic_manager'),
  projectManager: getIcon('ic_projectManager'),
  stage: getIcon('ic_stage'),
  momo: getIcon('ic_momo'),
  dayOverview: getIcon('ic_dayOverview'),
  dashboard: getIcon('ic_dashboard'),
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
    subheader: 'Quản lý thương hiệu',
    items: [{ title: 'Thương hiệu', path: PATH_DASHBOARD.business.list, icon: ICONS.business }]
  },
  // MANAGEMENT
  {
    subheader: 'Quản lý người dùng',
    items: [
      {
        title: 'Quản lý thương hiệu',
        path: PATH_DASHBOARD.admin.listBusiness,
        icon: ICONS.manager
      },
      {
        title: 'Nhà đầu tư',
        path: PATH_DASHBOARD.admin.listInvestor,
        icon: ICONS.investor
      },
      {
        title: 'Chủ dự án',
        path: PATH_DASHBOARD.admin.listProjectOwner,
        icon: ICONS.projectManager
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
        icon: ICONS.stage,
        children: [
          {
            title: 'Đang chờ duyệt',
            path: PATH_DASHBOARD.projects.draftProject
          },
          {
            title: 'Mở đầu tư',
            path: PATH_DASHBOARD.projects.callingProject
          },
          {
            title: 'Đang chờ kích hoạt',
            path: PATH_DASHBOARD.projects.waitingToActivateProject
          },
          {
            title: 'Đang hoạt động',
            path: PATH_DASHBOARD.projects.activeProject
          },
          {
            title: 'Quá hạn đầu tư',
            path: PATH_DASHBOARD.projects.overdateProject
          },
          {
            title: 'Đã kết thúc',
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
        title: 'Giao dịch momo',
        path: PATH_DASHBOARD.transaction.accountTransaction,
        icon: ICONS.momo
      },
      // {
      //   title: 'Lịch sử doanh thu',
      //   path: PATH_DASHBOARD.transaction.PeriodRevenueHistory,
      //   icon: ICONS.PeriodRevenueHistory
      // }
      {
        title: 'Lệnh rút tiền',
        path: PATH_DASHBOARD.transaction.withdrawRequest,
        icon: ICONS.bankTransaction
      }
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
