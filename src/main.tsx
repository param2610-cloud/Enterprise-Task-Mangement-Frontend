import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing_view from './components/home/LandingPage.tsx'
import Authlayout from './components/auth/authlayout.tsx'
import Login from './components/auth/login.tsx'
import Signup from './components/auth/signup.tsx'
import Layout from './layout.tsx'
import Dashboard from './components/protected/dashboard.tsx'
import { AppProvider } from './lib/context.tsx'
import Protectedlayout from './components/protected/Protectedlayout.tsx'

const router = createBrowserRouter([
  {
    path: "/",          // Root path
    element: <Layout />, // Layout component
    children: [
      {
        path: "/",       // Matches the root path
        element: <Landing_view /> // Landing view component
      },
      {
        path: "auth",   // Base path for auth routes
        element: <Authlayout />, // Auth layout component
        children: [
          {
            path: "login", // Relative to "auth"
            element: <Login /> // Login component
          },
          {
            path: "signup", // Relative to "auth"
            element: <Signup /> // Signup component
          }
        ]
      },
      {
        path:"panel",
        element:<Protectedlayout/>,
        children: [
          {
            path:"dashboard",
            element:<Dashboard/>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  // </React.StrictMode>,
)
