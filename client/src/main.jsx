import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SavedPolicy from './pages/SavedPolicy'
import Home from './pages/Home';
import SignupForm from './pages/SignupForm.jsx';
import LoginForm from './pages/LoginForm.jsx';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <LoginForm />
      }, 
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/saved',
        element: <SavedPolicy />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
