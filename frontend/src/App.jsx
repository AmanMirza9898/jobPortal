import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout' // Layout ko import karein
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Home from './components/Home'
import { Jobs } from "./components/Jobs"
import { Jobs as AdminJobs } from "./components/admin/Jobs"
import { Browse } from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import ProtectedRoute from './components/ProtectedRoute';
import { Companies } from './components/admin/Companies'
import { CompanyCreate } from './components/admin/CompanyCreate'
import { CompanySetup } from './components/admin/CompanySetup'
import PostJob from './components/admin/PostJob'
import EditJob from './components/admin/EditJob'
import { Applicants } from './components/admin/Applicants'
import AllApplicants from './components/admin/AllApplicants'
import AdminProfile from './components/admin/AdminProfile'
import NotFound from './components/NotFound';
import ResumeScorer from './components/ResumeScorer';
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboardHome from './components/admin/AdminDashboardHome'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/jobs",
        element: <Jobs />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/forgot-password/email",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/browse",
        element: <Browse />
      },
      {
        path: "/description/:id",
        element: <JobDescription />
      },
      {
        path: "/ai-resume-scorer",
        element: <ProtectedRoute role="student"><ResumeScorer /></ProtectedRoute>
      },
      {
        path: "/profile",
        element: <ProtectedRoute role="student"><Profile /></ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: "/admin",
    element: <ProtectedRoute role="recruiter"><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardHome />
      },
      {
        path: "profile",
        element: <AdminProfile />
      },
      {
        path: "companies",
        element: <Companies />
      },
      {
        path: "companies/create",
        element: <CompanyCreate />
      },
      {
        path: "companies/:id",
        element: <CompanySetup />
      },
      {
        path: "jobs",
        element: <AdminJobs />
      },
      {
        path: "applicants",
        element: <AllApplicants />
      },
      {
        path: "jobs/create",
        element: <PostJob />
      },
      {
        path: "jobs/:id",
        element: <EditJob />
      },
      {
        path: "jobs/:id/applicants",
        element: <Applicants />
      },
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      }
    ]
  },
])

function App() {
  return (
    <>
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-size-[60px_60px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
      </div>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App