// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  //Quản lý dự án
  projects: {
    root: path(ROOTS_DASHBOARD, '/project'),
    projectKrowd: path(ROOTS_DASHBOARD, '/project/projectKrowd'),
    project: path(ROOTS_DASHBOARD, '/project/:name'),
    projectById: path(ROOTS_DASHBOARD, '/project/nike-air-force-1-ndestrukt')
  },
  //doanh nghiệp
  business: {
    root: path(ROOTS_DASHBOARD, '/business'),
    profile: path(ROOTS_DASHBOARD, '/business/profile'),
    cards: path(ROOTS_DASHBOARD, '/business/cards'),
    list: path(ROOTS_DASHBOARD, '/business/list'),
    newUser: path(ROOTS_DASHBOARD, '/business/new'),
    editById: path(ROOTS_DASHBOARD, `/business/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/business/account'),
    invoice: path(ROOTS_DASHBOARD, '/business/invoice')
  },
  //Người dùng
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    profile: path(ROOTS_DASHBOARD, '/admin/profile'),
    cards: path(ROOTS_DASHBOARD, '/admin/cards'),
    list: path(ROOTS_DASHBOARD, '/admin/list'),
    newUser: path(ROOTS_DASHBOARD, '/admin/new'),
    editById: path(ROOTS_DASHBOARD, `/admin/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/admin/account')
  },
  //Ví
  wallet: {
    root: path(ROOTS_DASHBOARD, '/wallet'),
    system: path(ROOTS_DASHBOARD, '/wallet/system-wallet'),
    transaction: path(ROOTS_DASHBOARD, '/wallet/transaction-wallet'),
    allWallet: path(ROOTS_DASHBOARD, '/wallet/all-wallet')
  },
  //Quản lý khác
  other: {
    root: path(ROOTS_DASHBOARD, '/other'),
    list: path(ROOTS_DASHBOARD, '/other/list'),
    field: path(ROOTS_DASHBOARD, '/other/field'),
    area: path(ROOTS_DASHBOARD, '/other/area'),
    role: path(ROOTS_DASHBOARD, '/other/role'),
    risk: path(ROOTS_DASHBOARD, '/other/risk'),
    investment: path(ROOTS_DASHBOARD, '/other/investment')
  },
  //tạm thời k xài
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  //tạm thời k xài
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  //tạm thời k xài
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  kanban: path(ROOTS_DASHBOARD, '/kanban')
};
