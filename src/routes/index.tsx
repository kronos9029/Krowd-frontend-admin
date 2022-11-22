import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from 'layouts/dashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import KrowdDetailView from 'components/table/krowd-table/KrowdDetailView';
import InvestorKrowdTable from 'components/table/manage-user/InvestorKrowdTable';
import ProjectOwnerKrowdTable from 'components/table/manage-user/ProjectOwnerKrowdTable';
import BusinessManagerKrowdTable from 'components/table/manage-user/BusinessManagerKrowdTable';
import DashboardLayoutProject from 'layouts/dashboardProject';
// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    // DASHBOARD PROJECT ROUTES
    {
      path: 'projectBoard',
      element: (
        <AuthGuard>
          <DashboardLayoutProject />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/projectBoard/project" replace /> },
        { path: 'project/projectDetail', element: <ProjectDetails /> },
        { path: 'project/projectDetail/:id', element: <ProjectDetails /> },
        { path: 'project/daily_revenue', element: <ReportDailyProject /> },
        { path: 'project/bills/daily', element: <BillReportDailyProject /> },
        { path: 'project/project-investments', element: <InvestmentProject /> },
        { path: 'project/stage-report', element: <StageReportProject /> }
        // { path: 'project/investment-wallet', element: <GeneralBanking /> }
        // { path: 'project/project-investor', element: <InvestorList /> }
        // { path: 'project/payment-wallet', element: <WalletI4Project /> }
      ]
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'transaction',
          children: [
            { element: <Navigate to="/dashboard/account-transaction" replace /> },
            { path: 'wallet-transaction', element: <FieldManagerment /> },
            { path: 'account-transaction', element: <AccountTransactionDetails /> },
            { path: 'history-investment', element: <FieldCreate /> },
            { path: 'withdraw-request', element: <WithdrawRequestDetails /> }
          ]
        },
        {
          path: 'other',
          children: [
            { element: <Navigate to="/dashboard/other/field" replace /> },
            { path: 'fields', element: <FieldManagerment /> },
            { path: 'field/new', element: <FieldCreate /> },
            {
              path: 'field/Details/:id',
              element: <KrowdDetailView />
            },
            {
              path: 'risk/:id',
              element: <KrowdDetailView />
            },
            { path: 'area', element: <AreasManagement /> },
            { path: 'role', element: <RolesManagement /> },
            { path: 'risk_type-new', element: <RiskTypeCreate /> },
            { path: ':id/edit/risk', element: <RiskTypeCreate /> },
            { path: 'risks', element: <RiskTypesManagement /> },
            { path: 'investment', element: <EcommerceProductList /> }
          ]
        },
        {
          path: 'project',
          children: [
            { element: <Navigate to="/dashboard/project" replace /> },
            { path: 'project-Krowd', element: <ProjectList /> },
            { path: 'draftProject', element: <WaitingProjectList /> },
            { path: 'callingProject', element: <CallingProjectList /> },
            { path: 'overdateProject', element: <OverDateProjectList /> },
            { path: 'closeProject', element: <CloseProjectList /> },
            { path: 'activeProject', element: <ActiveProjectList /> },
            { path: 'waitingToActivate', element: <WaitingToActivateProjectList /> },
            { path: 'projectDetails/:id', element: <ProjectDetails /> }
          ]
        },
        {
          path: 'wallet',
          children: [
            { element: <Navigate to="/dashboard/wallet" replace /> },
            { path: 'system-wallet', element: <SystemWalletList /> },
            { path: 'transaction-wallet', element: <SystemWalletList /> },
            { path: 'all-wallet', element: <SystemWalletList /> }
            // { path: 'project/:name', element: <KrowdProjectDetails /> }
          ]
        },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <FieldManagerment /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'details', element: <BusinessDetails /> }
          ]
        },

        {
          path: 'business',
          children: [
            { element: <Navigate to="/dashboard/business/profile" replace /> },
            { path: 'list', element: <BusinessList /> },
            { path: 'new', element: <UserCreate /> },
            { path: 'tempBusiness/new', element: <KrowdDetailView /> },
            { path: 'tempBusiness/details/:id', element: <KrowdDetailView /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'details/:id', element: <BusinessDetails /> }
          ]
        },
        {
          path: 'admin',
          children: [
            { element: <Navigate to="/dashboard/admin/profile" replace /> },
            { path: 'list_business', element: <BusinessManagerKrowdTable /> },
            { path: 'list_investor', element: <InvestorKrowdTable /> },
            { path: 'investor/details/:id', element: <InvestorDetails /> },
            { path: 'list_project_manager', element: <ProjectOwnerKrowdTable /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            {
              path: 'userKrowd/:id',
              element: <KrowdDetailView />
            },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        { path: 'kanban', element: <Kanban /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));

// Thống kê toàn bộ hệ thống
const GeneralApp = Loadable(
  lazy(() => import('../pages/dashboard/generalManagers/KrowdAdminDashboard'))
);
const GeneralEcommerce = Loadable(
  lazy(() => import('../pages/dashboard/generalManagers/GeneralEcommerce'))
);
const GeneralAnalytics = Loadable(
  lazy(() => import('../pages/dashboard/generalManagers/GeneralAnalytics'))
);
const GeneralBanking = Loadable(
  lazy(() => import('../pages/dashboard/generalManagers/GeneralBooking'))
);
const GeneralBooking = Loadable(
  lazy(() => import('../pages/dashboard/generalManagers/GeneralBooking'))
);

const AccountTransactionDetails = Loadable(
  lazy(
    () => import('../pages/dashboard/krowdManages/transactionManagement/AccountTransactionDetails')
  )
);
const WithdrawRequestDetails = Loadable(
  lazy(
    () =>
      import('../pages/dashboard/krowdManages/withdrawRequestMananagement/withdrawRequestDetails')
  )
);

// Thuộc về quản lý giao dịch
// const AccountTransactionDetails = Loadable(
//   lazy(
//     () => import('../pages/dashboard/krowdManages/transactionManagement/AccountTransactionDetails')
//   )
// );
//----------------------------
//Thuộc về quản lý khác
const FieldManagerment = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/otherManagers/FieldManagerment'))
);
const FieldCreate = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/otherManagers/FieldCreate'))
);
const RiskTypeCreate = Loadable(
  lazy(() => import('../components/_dashboard/other/RiskType/RiskTypeCreate'))
);
const AreasManagement = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/otherManagers/AreasManagement'))
);
const RolesManagement = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/otherManagers/RolesManagement'))
);
const RiskTypesManagement = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/otherManagers/RiskTypesManagement'))
);
//====================================================REPORT OF PROJECT============================================================
const ReportDailyProject = Loadable(
  lazy(
    () =>
      import('../pages/dashboard/krowdManages/projectManagerment/report-revenue/ReportDailyProject')
  )
);
const BillReportDailyProject = Loadable(
  lazy(
    () =>
      import(
        '../pages/dashboard/krowdManages/projectManagerment/report-revenue/BillReportDailyProject'
      )
  )
);
const StageReportProject = Loadable(
  lazy(
    () =>
      import('../pages/dashboard/krowdManages/projectManagerment/report-revenue/StageReportProject')
  )
);
const StageProjectList = Loadable(
  lazy(
    () =>
      import('../pages/dashboard/krowdManages/projectManagerment/report-revenue/StageProjectList')
  )
);
//====================================================INVESTMENT OF PROJECT============================================================

const InvestmentProject = Loadable(
  lazy(
    () => import('../pages/dashboard/krowdManages/projectManagerment/investment/InvestmentProject')
  )
);
//========================================================================================
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/templateManagers/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/templateManagers/EcommerceProductCreate'))
);
const EcommerceCheckout = Loadable(
  lazy(() => import('../pages/dashboard/templateManagers/EcommerceCheckout'))
);
const BusinessDetails = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/BusinessDetails'))
);
const InvestorDetails = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/usersManagement/InvestorDetails'))
);
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogNewPost')));
const BusinessList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/BusinessList'))
);
const ProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/ProjectList'))
);
const WaitingProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/WaitingProjectList'))
);
const CallingProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/CallingProjectList'))
);
const OverDateProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/OverDateProjectList'))
);
const ActiveProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/ActiveProjectList'))
);
const WaitingToActivateProjectList = Loadable(
  lazy(
    () => import('../pages/dashboard/krowdManages/projectManagerment/WaitingToActivateProjectList')
  )
);
const CloseProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/CloseProjectList'))
);
const ProjectDetails = Loadable(
  lazy(
    () =>
      import('../pages/dashboard/krowdManages/projectManagerment/details/ProjectKrowdAdminDetails')
  )
);
const SystemWalletList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/walletManagement/SystemWallet'))
);
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/templateManagers/UserAccount')));
const UserCreate = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/UserCreate'))
);
const Chat = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Mail')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Kanban')));

// Quản lý lỗi hệ thống
const ComingSoon = Loadable(lazy(() => import('../pages/dashboard/errorsManagers/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/dashboard/errorsManagers//Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/dashboard/errorsManagers//Page500')));
const NotFound = Loadable(lazy(() => import('../pages/dashboard/errorsManagers/Page404')));
