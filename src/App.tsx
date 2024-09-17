import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Loader from "./components/global/Loader";
import "./App.css";
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((group, groupIndex) =>
            group.items.map((route, routeIndex) => (
              <Route
                key={`${groupIndex}-${routeIndex}`}
                path={route.path}
                element={route.component}
              />
            ))
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
