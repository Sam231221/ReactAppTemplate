import { Suspense } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/index";
import { Spinner } from "./components/Spinner";
import { ErrorPage } from "./utilities/404Error";
import { Home } from "./pages/Home";
import { AddUser } from "./components/Users/AddUser";
import { UpdateUser } from "./components/Users/UpdateUser";
import ViewUser from "./components/Users/ViewUser";
function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path={"/"} element={<Home />}></Route>
            <Route exact path={"/users/add/"} element={<AddUser />} />
            <Route exact path={"/users/update/:id/"} element={<UpdateUser />} />
            <Route exact path={"/users/:id/"} element={<ViewUser />} />
            <Route element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
