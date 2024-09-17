import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Register = React.lazy(() => import("../pages/Register"));

const routes = [
  {
    title: "General",
    items: [
      {
        name: "Home",
        path: "/",
        component: <Home />,
      },
      {
        name: "NotFound",
        path: "*",
        component: <NotFound />,
      },
    ],
  },
  {
    title: "Authentication",
    items: [
      {
        name: "Register",
        path: "/register",
        component: <Register />,
      },
    ],
  },
];
export default routes;
