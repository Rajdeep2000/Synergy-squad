import React from 'react';
import './App.scss'
import ErrorPage from './components/ErrorPage';
import FormPage from './components/FormPage/FormPage';
import LandingPage from './components/LandingPage';
import PageHeader from './components/PageHeader';
import FormOutputPage from './components/FormOutputPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { useTheme } from '@carbon/react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import CameraInput from './components/CameraInput';
import { GlobalTheme, Theme } from '@carbon/react';
import Dashboard from './components/Dashboard';
import { Product } from '@carbon/icons-react';
import ProductDetails from './components/ProductDetails';
import VoiceInput from './components/VoiceInput';
import { Login } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import apiConfig from './config/apiConfig.json';
import axios from 'axios';
import VoiceInputContainer from './components/VoiceInputContainer';

function App() {
  const { theme } = useTheme();
  const [image, setImage] = useState();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <><PageHeader /><ErrorPage /></>,

    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "form/new",
      element: <RequireAuth><PageHeader /><FormPage /></RequireAuth>,
    },
    {
      path: "form/camera",
      element: <RequireAuth><PageHeader /><CameraInput image={image} setImage={setImage} /></RequireAuth>,
    },
    {
      path: "form/output",
      element: <RequireAuth><PageHeader /><FormOutputPage image={image} setImage={setImage} /></RequireAuth>,
    },
    {
      path: "form/output/:name/:type",
      element: <RequireAuth><PageHeader /><FormOutputPage /></RequireAuth>,
    },
    {
      path: "form/output/:name/:type/:qty",
      element: <RequireAuth><PageHeader /><FormOutputPage /></RequireAuth>,
    },
    {
      path: "form/voice",
      element: <RequireAuth><PageHeader /><VoiceInputContainer /></RequireAuth>,
    },
    {
      path: "dashboard",
      element: <RequireAuth><PageHeader /><Dashboard /></RequireAuth>,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "product-details/:name",
      element: <RequireAuth><PageHeader /><ProductDetails /></RequireAuth>,
    }
  ]);

  /*   const login = async () => {
      try {
        await axios.post(apiConfig.login, {
          username: 'example_user1',
          email: 'user1@example.com',
          password: 'secure_password1'
        });
      } catch (err) {
        console.error(err)
      }
    }
  
    login(); */

  return (
    <GlobalTheme theme="g10">
      <Theme theme="g10">
        <>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </>
      </Theme>
    </GlobalTheme>
  )
}
function RequireAuth({ children }) {
  /* if (!window.sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  } */
  return children;
}

export default App
