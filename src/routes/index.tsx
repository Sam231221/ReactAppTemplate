import { Home, NotFound, Register } from "../pages";

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
