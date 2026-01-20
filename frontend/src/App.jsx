import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout' // Layout ko import karein
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home'
import { Jobs } from "./components/Jobs"
import { Browse } from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

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
        element: <Profile />
      },
    ]
  },
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App