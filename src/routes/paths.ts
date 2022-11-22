// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_DASHBOARD_PROJECT = '/projectBoard';

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
    projectKrowd: path(ROOTS_DASHBOARD, '/project/project-Krowd'),
    projectDetails: path(ROOTS_DASHBOARD, '/project/projectDetails'),
    draftProject: path(ROOTS_DASHBOARD, '/project/draftProject'),
    waitingToActivateProject: path(ROOTS_DASHBOARD, '/project/waitingToActivate'),
    callingProject: path(ROOTS_DASHBOARD, '/project/callingProject'),
    overdateProject: path(ROOTS_DASHBOARD, '/project/overdateProject'),
    closeProject: path(ROOTS_DASHBOARD, '/project/closeProject'),
    activeProject: path(ROOTS_DASHBOARD, '/project/activeProject'),
    projectById: path(ROOTS_DASHBOARD, '/project/nike-air-force-1-ndestrukt')
  },

  //doanh nghiệp
  business: {
    root: path(ROOTS_DASHBOARD, '/business'),
    profile: path(ROOTS_DASHBOARD, '/business/profile'),
    cards: path(ROOTS_DASHBOARD, '/business/cards'),
    list: path(ROOTS_DASHBOARD, '/business/list'),
    newUser: path(ROOTS_DASHBOARD, '/business/new'),
    createBusiness: path(ROOTS_DASHBOARD, '/business/tempBusiness/new'),
    tempBusiness: path(ROOTS_DASHBOARD, '/business/tempBusiness/details'),
    editById: path(ROOTS_DASHBOARD, `/business/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/admin/account'),
    details: path(ROOTS_DASHBOARD, '/business/details')
  },
  //Người dùng
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    profile: path(ROOTS_DASHBOARD, '/admin/profile'),
    cards: path(ROOTS_DASHBOARD, '/admin/cards'),
    listBusiness: path(ROOTS_DASHBOARD, '/admin/list_business'),
    listInvestor: path(ROOTS_DASHBOARD, '/admin/list_investor'),
    investorDetails: path(ROOTS_DASHBOARD, '/admin/investor/details'),
    listProjectOwner: path(ROOTS_DASHBOARD, '/admin/list_project_manager'),
    newUser: path(ROOTS_DASHBOARD, '/admin/new'),
    userKrowd: path(ROOTS_DASHBOARD, `/admin/userKrowd`),
    account: path(ROOTS_DASHBOARD, '/admin/account')
  },
  // giao dịch
  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction/account-transaction'),
    walletTransaction: path(ROOTS_DASHBOARD, '/transaction/wallet'),
    accountTransaction: path(ROOTS_DASHBOARD, '/transaction/account-transaction'),
    PeriodRevenueHistory: path(ROOTS_DASHBOARD, '/transaction/account'),
    withdrawRequest: path(ROOTS_DASHBOARD, '/transaction/withdraw-request')
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
    fields: path(ROOTS_DASHBOARD, '/other/fields'),
    fieldDetails: path(ROOTS_DASHBOARD, '/other/fields/details'),
    newRiskType: path(ROOTS_DASHBOARD, '/other/risk_type-new'),
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
    productById: path(ROOTS_DASHBOARD, 'projectDetailst'),
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
//SIDEBAR PROJECT
export const PATH_DASHBOARD_PROJECT = {
  root: ROOTS_DASHBOARD_PROJECT,
  project: {
    root: path(ROOTS_DASHBOARD_PROJECT, `/project/projectDetail`),
    reportRevenue: path(ROOTS_DASHBOARD_PROJECT, '/project/daily_revenue'),
    stageProject: path(ROOTS_DASHBOARD_PROJECT, '/project/stage-project'),
    billDailyReport: path(ROOTS_DASHBOARD_PROJECT, '/project/bills/daily'),
    Project_Investment: path(ROOTS_DASHBOARD_PROJECT, '/project/project-investments'),
    Project_Investor: path(ROOTS_DASHBOARD_PROJECT, '/project/project-investor'),
    stageReport: path(ROOTS_DASHBOARD_PROJECT, '/project/stage-report')
  },
  wallet_project: {
    walletP3: path(ROOTS_DASHBOARD_PROJECT, '/project/investment-wallet'),
    walletP4: path(ROOTS_DASHBOARD_PROJECT, '/project/payment-wallet')
  }
};
