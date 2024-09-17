import React from "react";
const Home = React.lazy(() => import("./Home"));
const NotFound = React.lazy(() => import("./NotFound"));
const Register = React.lazy(() => import("./Register"));
export { Home, NotFound, Register };
