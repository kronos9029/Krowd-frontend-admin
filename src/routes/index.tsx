import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from 'layouts/main';
import DashboardLayout from 'layouts/dashboard';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import UsersKrowd from 'pages/dashboard/krowdManages/usersManagement/UsersKrowd';

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
            { path: 'history-investment', element: <FieldCreate /> }
          ]
        },
        {
          path: 'other',
          children: [
            { element: <Navigate to="/dashboard/other/field" replace /> },
            { path: 'field', element: <FieldManagerment /> },
            { path: 'field-new', element: <FieldCreate /> },
            { path: ':id/edit', element: <FieldCreate /> },
            { path: 'area', element: <AreasManagement /> },
            { path: 'role', element: <RolesManagement /> },
            { path: 'risk_type-new', element: <RiskTypeCreate /> },
            { path: ':id/edit/risk', element: <RiskTypeCreate /> },
            { path: 'risk', element: <RiskTypesManagement /> },
            { path: 'investment', element: <EcommerceProductList /> }
          ]
        },
        {
          path: 'project',
          children: [
            { element: <Navigate to="/dashboard/project" replace /> },
            { path: 'projectKrowd', element: <ProjectList /> },
            // { path: 'projectDetails', element: <KrowdProjectDetails /> }
            { path: 'projectDetails', element: <ProjectKrowdAdminDetails /> }
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
            { path: 'projectDetails', element: <KrowdProjectDetails /> },
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
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <BusinessList /> },
            { path: 'new', element: <UserCreate /> },
            { path: 'newAccount', element: <UserCreateAccount /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
            { path: 'details/:id', element: <BusinessDetails /> }
          ]
        },
        {
          path: 'admin',
          children: [
            { element: <Navigate to="/dashboard/admin/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UsersKrowd /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
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
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/generalManagers/GeneralApp')));
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
const ProjectManagement = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/ProjectManagement'))
);
const AccountTransactionDetails = Loadable(
  lazy(
    () => import('../pages/dashboard/krowdManages/transactionManagement/AccountTransactionDetails')
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

const KrowdProjectDetails = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/projectManagerment/KrowdProjectDetail'))
);
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

const ProjectKrowdAdminDetails = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/ProjectKrowdAdminDetails'))
);
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/templateManagers/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/templateManagers/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/templateManagers/UserCards')));
const BusinessList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/BusinessList'))
);
const ProjectList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/ProjectList'))
);
const SystemWalletList = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/walletManagement/SystemWallet'))
);
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/templateManagers/UserAccount')));
const UserCreate = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/UserCreate'))
);
const UserCreateAccount = Loadable(
  lazy(() => import('../pages/dashboard/krowdManages/businessManagement/UserCreateAccount'))
);
const Chat = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Mail')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/templateManagers/Kanban')));

// Quản lý lỗi hệ thống
const ComingSoon = Loadable(lazy(() => import('../pages/dashboard/errorsManagers/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/dashboard/errorsManagers//Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/dashboard/errorsManagers//Page500')));
const NotFound = Loadable(lazy(() => import('../pages/dashboard/errorsManagers/Page404')));
