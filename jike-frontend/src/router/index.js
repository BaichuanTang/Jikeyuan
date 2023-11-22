import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import {AuthRoute} from "@/components/AuthRoute";
import {lazy, Suspense} from "react";

const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout/></AuthRoute>,
    children: [
      {
        path: '',
        element: <Navigate to="/home" replace/>
      },
      {
        path: '/home',
        element: <Suspense fallback="加载中"><Home/></Suspense>
      },
      {
        path: '/article',
        element: <Suspense fallback="加载中"><Article/></Suspense>
      },
      {
        path: '/publish',
        element: <Suspense fallback="加载中"><Publish/></Suspense>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

export default router
