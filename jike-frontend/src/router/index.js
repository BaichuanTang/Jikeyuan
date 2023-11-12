import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import {AuthRoute} from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "src/pages/Article";
import Publish from "@/pages/Publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout/></AuthRoute>,
    children:[
      {
        path:'',
        element:<Navigate to="/home" replace/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/Article',
        element:<Article/>
      },
      {
        path:'/publish',
        element:<Publish/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

export default router
