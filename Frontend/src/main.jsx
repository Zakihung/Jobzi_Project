import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import App from "./App.jsx";
import EmployerApp from "./EmployerApp.jsx";
// Thêm import ConfigProvider từ antd
import { ConfigProvider, App as AntdApp } from "antd";
import RoutesDevTool from "./components/templates/RoutesDevTool.jsx";

//Candidate
import HomePage from "./pages/candidate/HomePage.jsx";
// import ProfilePage from "./pages/candidate/ProfilePage";
// import AccountPage from "./pages/candidate/AccountPage";
import SignupCandidatePage from "./pages/candidate/SignupCandidatePage";
import SigninCandidatePage from "./pages/candidate/SigninCandidatePage";
import SearchPage from "./pages/candidate/SearchPage.jsx";
import CompanyPage from "./pages/candidate/CompanyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPostDetailPage from "./pages/candidate/JobPostDetailPage.jsx";
import CompanyDetailPage from "./pages/candidate/CompanyDetailPage.jsx";
import ProfileCandidatePage from "./pages/candidate/ProfileCandidatePage.jsx";
import OnlineResumePage from "./pages/candidate/OnlineResumePage.jsx";

//Employer
import SigninEmployerPage from "./pages/employer/SigninEmployerPage.jsx";
import DashboardEmployer from "./pages/employer/DashboardEmployer.jsx";
import PostJobPage from "./pages/employer/PostJobPage.jsx";
import { AuthWrapper } from "./contexts/auth.context.jsx";
// import EmployerApp from "./EmployerApp.jsx";
// import CandidateSearchPage from "./pages/employer/CandidateSearchPage";
// import EmployerProfilePage from "./pages/employer/EmployerProfilePage";
// import EmployerAccountPage from "./pages/employer/EmployerAccountPage";
// import EmployerCompanyPage from "./pages/employer/EmployerCompanyPage";
// import EmployerJobPostListPage from "./pages/employer/EmployerJobPostListPage";
// import EmployerJobPostDetailPage from "./pages/employer/EmployerJobPostDetailPage";
// import SignupEmployerPage from "./pages/employer/SignupEmployerPage";

//Admin
// import AdminApp from "./AdminApp.jsx";
// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import AdminJobPostManagementPage from "./pages/admin/AdminJobPostManagementPage";
// import AdminAccountManagementPage from "./pages/admin/AdminAccountManagementPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Routes cho Candidate
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "profile",
        element: <ProfileCandidatePage />,
      },
      // {
      //   path: "account",
      //   element: <AccountPage />,
      // },
      {
        path: "companies",
        element: <CompanyPage />,
      },
      {
        path: "companydetail",
        element: <CompanyDetailPage />,
      },
      {
        path: "jobpostdetail",
        element: <JobPostDetailPage />,
      },
      {
        path: "online-resume",
        element: <OnlineResumePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "signup",
    element: <SignupCandidatePage />,
  },
  {
    path: "signin",
    element: <SigninCandidatePage />,
  },

  //Routes cho Employer
  {
    path: "/employer",
    element: <EmployerApp />,
    children: [
      {
        index: true,
        element: <DashboardEmployer />,
      },
      {
        path: "postjob",
        element: <PostJobPage />,
      },
    ],
  },
  //     {
  //       path: "profile",
  //       element: <EmployerProfilePage />,
  //     },
  //     {
  //       path: "account",
  //       element: <EmployerAccountPage />,
  //     },
  //     {
  //       path: "company",
  //       element: <EmployerCompanyPage />,
  //     },
  //     {
  //       path: "jobposts",
  //       element: <EmployerJobPostListPage />,
  //     },
  //     {
  //       path: "jobposts/:id",
  //       element: <EmployerJobPostDetailPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "signupEmployer",
  //   element: <SignupEmployerPage />,
  // },
  {
    path: "employer-signin",
    element: <SigninEmployerPage />,
  },

  // Routes cho Admin
  // {
  //   path: "/admin",
  //   element: <AdminApp />, // App với header, footer cho admin
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminDashboardPage />,
  //     },
  //     {
  //       path: "jobposts",
  //       element: <AdminJobPostManagementPage />,
  //     },
  //     {
  //       path: "accounts",
  //       element: <AdminAccountManagementPage />,
  //     },
  //   ],
  // },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#577cf6", // Màu chính
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", // Màu nền
        },
      }}
    >
      <AntdApp>
        <RoutesDevTool />
        <AuthWrapper>
          <RouterProvider router={router} />
        </AuthWrapper>
      </AntdApp>
    </ConfigProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
