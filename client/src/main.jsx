import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import FirstPage from './AllPages/FirstPage.jsx';
import Logging from './AllPages/Logging.jsx';

// const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <App />,
//       children: [
//         {
//           path: "/login",
//           element: <Logging />
//         },
//       ]
//     } 
//   ]
// )
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
   <BrowserRouter>
   <App />
   </BrowserRouter>
  </React.StrictMode>
);
