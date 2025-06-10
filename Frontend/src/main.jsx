import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import App from "./App.jsx";
// Thêm import ConfigProvider từ antd
import { ConfigProvider, App as AntdApp } from "antd";

import HomePage from "./pages/candidate/HomePage.jsx";
// import JobSearchPage from "./pages/candidate/JobSearchPage";
// import ProfilePage from "./pages/candidate/ProfilePage";
// import AccountPage from "./pages/candidate/AccountPage";
// import CompanyListPage from "./pages/candidate/CompanyListPage";
// import CompanyDetailPage from "./pages/candidate/CompanyDetailPage";
// import JobPostDetailPage from "./pages/candidate/JobPostDetailPage";
import SignupCandidatePage from "./pages/candidate/SignupCandidatePage";
import LoginCandidatePage from "./pages/candidate/LoginCandidatePage";
// import EmployerApp from "./EmployerApp.jsx";
// import EmployerDashboardPage from "./pages/employer/EmployerDashboardPage";
// import CandidateSearchPage from "./pages/employer/CandidateSearchPage";
// import EmployerProfilePage from "./pages/employer/EmployerProfilePage";
// import EmployerAccountPage from "./pages/employer/EmployerAccountPage";
// import EmployerCompanyPage from "./pages/employer/EmployerCompanyPage";
// import EmployerJobPostListPage from "./pages/employer/EmployerJobPostListPage";
// import EmployerJobPostDetailPage from "./pages/employer/EmployerJobPostDetailPage";
// import SignupEmployerPage from "./pages/employer/SignupEmployerPage";
// import LoginEmployerPage from "./pages/employer/LoginEmployerPage";
// import AdminApp from "./AdminApp.jsx";
// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import AdminJobPostManagementPage from "./pages/admin/AdminJobPostManagementPage";
// import AdminAccountManagementPage from "./pages/admin/AdminAccountManagementPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Routes cho Candidate
  {
    path: "/",
    element: <App />, // App với header, footer cho candidate
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: "search",
      //   element: <JobSearchPage />,
      // },
      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "account",
      //   element: <AccountPage />,
      // },
      // {
      //   path: "companies",
      //   element: <CompanyListPage />,
      // },
      // {
      //   path: "companies/:id",
      //   element: <CompanyDetailPage />,
      // },
      // {
      //   path: "jobposts/:id",
      //   element: <JobPostDetailPage />,
      // },
    ],
  },
  {
    path: "signup",
    element: <SignupCandidatePage />,
  },
  {
    path: "login",
    element: <LoginCandidatePage />,
  },

  // Routes cho Employer
  // {
  //   path: "/employer",
  //   element: <EmployerApp />, // App với header, footer cho employer
  //   children: [
  //     {
  //       index: true,
  //       element: <EmployerDashboardPage />,
  //     },
  //     {
  //       path: "search",
  //       element: <CandidateSearchPage />,
  //     },
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
  // {
  //   path: "loginEmployer",
  //   element: <LoginEmployerPage />,
  // },

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
          fontFamily: "Bitter, serif", // Font chữ
        },
      }}
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
