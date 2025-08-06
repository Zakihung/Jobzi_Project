import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import "./styles/global.css";
import App from "./App.jsx";
import EmployerApp from "./EmployerApp.jsx";
// import RoutesDevTool from "./components/templates/RoutesDevTool.jsx";
import AccountPage from "./pages/AccountPage.jsx";

//Candidate
import HomePage from "./pages/candidate/HomePage.jsx";
import SignupCandidatePage from "./pages/candidate/SignupCandidatePage";
import SigninCandidatePage from "./pages/candidate/SigninCandidatePage";
import CompanyPage from "./pages/candidate/CompanyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPostDetailPage from "./pages/candidate/JobPostDetailPage.jsx";
import CompanyDetailPage from "./pages/candidate/CompanyDetailPage.jsx";
import ProfileCandidatePage from "./pages/candidate/ProfileCandidatePage.jsx";
import OnlineResumePage from "./pages/candidate/OnlineResumePage.jsx";
import JobCadidatePage from "./pages/candidate/JobCandidatePage.jsx";
import ResumeAnalysisPage from "./pages/candidate/ResumeAnalysisPage.jsx";

//Employer
import SignupEmployerPage from "./pages/employer/SignupEmployerPage.jsx";
import SigninEmployerPage from "./pages/employer/SigninEmployerPage.jsx";
import DashboardEmployerPage from "./pages/employer/DashboardEmployerPage.jsx";
import { AuthWrapper } from "./contexts/auth.context.jsx";
import JobEmployerPage from "./pages/employer/JobEmployerPage.jsx";
import PostJobPage from "./pages/employer/PostJobPage.jsx";
import CompanyDetailEmployerPage from "./pages/employer/CompanyDetailEmployerPage.jsx";
import CandidateEmployerPage from "./pages/employer/CandidateEmployerPage.jsx";
import JobPostDetailEmployerPage from "./pages/employer/JobPostDetailEmployerPage.jsx";

// import EmployerJobPostListPage from "./pages/employer/EmployerJobPostListPage";
// import EmployerJobPostDetailPage from "./pages/employer/EmployerJobPostDetailPage";

//Admin
import AdminApp from "./AdminApp.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminAccountManagementPage from "./pages/admin/AdminAccountManagementPage.jsx";
import AdminJobPostManagementPage from "./pages/admin/AdminJobPostManagementPage.jsx";
import AdminIndustryManagementPage from "./pages/admin/AdminIndustryManagementPage.jsx";
import AdminPositionManagementPage from "./pages/admin/AdminPositionManagementPage.jsx";
import AdminStatisticsPage from "./pages/admin/AdminStatisticsPage.jsx";

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
        path: "jobs",
        element: <JobCadidatePage />,
      },
      {
        path: "profile",
        element: <ProfileCandidatePage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "companies",
        element: <CompanyPage />,
      },
      {
        path: "company",
        children: [
          {
            path: ":companyId",
            element: <CompanyDetailPage />,
          },
        ],
      },
      {
        path: "jobpost",
        children: [
          {
            path: ":jobPostId",
            element: <JobPostDetailPage />,
          },
        ],
      },
      {
        path: "online-resume",
        element: <OnlineResumePage />,
      },
      {
        path: "resume-analysis/:job_post_id/:resume_file_id/:online_resume_id",
        element: <ResumeAnalysisPage />,
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
        element: <DashboardEmployerPage />,
      },
      {
        path: "postjob",
        element: <PostJobPage />,
      },
      {
        path: "jobs",
        element: <JobEmployerPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "company",
        element: <CompanyDetailEmployerPage />,
      },
      {
        path: "candidates",
        element: <CandidateEmployerPage />,
      },
      {
        path: "jobpost/:id",
        element: <JobPostDetailEmployerPage />,
      },
    ],
  },
  //     {
  //       path: "jobposts/:id",
  //       element: <EmployerJobPostDetailPage />,
  //     },
  //   ],
  // },
  {
    path: "/employer-signup",
    element: <SignupEmployerPage />,
  },
  {
    path: "/employer-signin",
    element: <SigninEmployerPage />,
  },

  // Routes cho Admin
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "accounts",
        element: <AdminAccountManagementPage />,
      },
      {
        path: "jobposts",
        element: <AdminJobPostManagementPage />,
      },
      {
        path: "industries",
        element: <AdminIndustryManagementPage />,
      },
      {
        path: "positions",
        element: <AdminPositionManagementPage />,
      },
      {
        path: "statistics",
        element: <AdminStatisticsPage />,
      },
    ],
  },
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
        <AuthWrapper>
          <RouterProvider router={router} />
        </AuthWrapper>
      </AntdApp>
    </ConfigProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
