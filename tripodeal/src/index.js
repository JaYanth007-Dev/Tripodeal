import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import "sweetalert2/dist/sweetalert2.min.css";
import React ,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AOS from 'aos';
import "aos/dist/aos.css";
import App from './App';
import Errors from './Component/ErrorHandling/Errors';
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Router, RouterProvider } from "react-router-dom";
import Unavailable from './Component/CommonComponents/UnavailablePage';
import Body from './Component/CommonComponents/Body';
import FlightPage from './Component/Flight/FlightPage';
import SignUp from './Component/LoginAndSignUp/SignUp';
import Login from './Component/LoginAndSignUp/Login';
import FlightsSelection from './Component/Flight/FlightsSelection';
import Steper from './Component/CommonComponents/Steper';
import SteperAndCounter from './Component/CommonComponents/SteperAndCounter';
import ContactUs from './Component/Other Components/ContactUs';
import MyBookings from './Component/CommonComponents/MyBookings';



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Errors />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Errors />,
      },
      {
        path: "/Login",
        element: <Login />,
        errorElement: <Errors />,
      },
      {
        path: "/SignIn",
        element: <SignUp />,
        errorElement: <Errors />,
      },
      {
        path: "/Hotel",
        element: <Unavailable />,
        errorElement: <Errors />,
      },
      {
        path: "/Bus",
        element: <Unavailable />,
        errorElement: <Errors />,
      },
      {
        path: "/Packages",
        element: <Unavailable />,
        errorElement: <Errors />,
      },
      {
        path: "/Flights",
        element: <FlightPage/>,
        errorElement: <Errors />,
      },
      {
        path: "/FlightsSelection",
        element: <SteperAndCounter/>,
        errorElement: <Errors />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs/>,
        errorElement: <Errors />,
      },
      {
        path: "/MyBookings",
        element: <MyBookings/>,
        errorElement: <Errors />,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}/>

);


