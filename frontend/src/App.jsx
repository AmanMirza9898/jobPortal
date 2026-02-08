import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout' // Layout ko import karein
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
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
import { Applicants } from './components/admin/Applicants'
import NotFound from './components/NotFound';


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
      // Agar aap chahte hain ki Login/Signup mein bhi Navbar dikhe:
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
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
        path: "/profile",
        element: <ProtectedRoute role="student"><Profile /></ProtectedRoute>
      },

      //admin routes
      {
        path: "/admin/companies",
        element: <ProtectedRoute role="recruiter"><Companies /></ProtectedRoute>
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute role="recruiter"><CompanyCreate /></ProtectedRoute>
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute role="recruiter"><CompanySetup /></ProtectedRoute>
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoute role="recruiter"><AdminJobs /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute role="recruiter"><PostJob /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedRoute role="recruiter"><Applicants /></ProtectedRoute>

      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
])

function App() {
  return (
    <>
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-size-[60px_60px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App