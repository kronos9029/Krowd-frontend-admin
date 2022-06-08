// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'ADMIN',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'Bảng điều khiển', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Tổng quan ngày', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Tổng quan tháng', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Quản lý',
    items: [
      // MANAGEMENT : USER
      // {
      //   title: 'Business',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     // { title: 'Các dự án', path: PATH_DASHBOARD.user.cards },
      //     // { title: 'create', path: PATH_DASHBOARD.user.newUser },
      //     // { title: 'edit', path: PATH_DASHBOARD.user.editById },
      //     // { title: 'account', path: PATH_DASHBOARD.user.account }
      //   ]
      // },

      // MANAGEMENT : BLOG
      { title: 'Quản lý dự án', path: PATH_DASHBOARD.blog.posts, icon: ICONS.blog },
      { title: 'Quản lý doanh nghiệp', path: PATH_DASHBOARD.user.list, icon: ICONS.ecommerce },
      { title: 'Quản lý người dùng', path: PATH_DASHBOARD.admin.list, icon: ICONS.cart }
      // MANAGEMENT : WALLET
      // {
      //   title: 'Quản lý ví:',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'Ví của hệ thống', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'Ví doanh thu', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'Các loại ví đầu tư', path: PATH_DASHBOARD.eCommerce.list }
      //   ]
      // }
    ]
  },
  // {
  //   subheader: 'Quản lý giao dịch:',
  //   items: [
  //     // MANAGEMENT : Giao dịch
  //     { title: 'Thanh toán giữa các ví', path: PATH_DASHBOARD.user.profile, icon: ICONS.user },
  //     { title: 'Giao dịch ngân hàng', path: PATH_DASHBOARD.user.profile, icon: ICONS.user },
  //     { title: 'Lịch sử doanh thu', path: PATH_DASHBOARD.user.profile, icon: ICONS.user }
  //   ]
  // },

  {
    subheader: '~~~~~~~~~~~~~~~~~~~~~~~~~',
    items: [
      {
        title: 'Quản lý khác:',
        path: PATH_DASHBOARD.other.root,
        icon: ICONS.cart,
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
  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // }
];

export default sidebarConfig;
