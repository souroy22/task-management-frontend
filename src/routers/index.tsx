import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import FallBack from "../components/FallBack";
const LazyPublicRoute = lazy(() => import("./PublicRoute"));
const LazyPrivateRoute = lazy(() => import("./PrivateRoute"));
const LazyHomePage = lazy(() => import("../pages/Home"));

const RouterComponent = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        <Route element={<LazyPublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
        <Route element={<LazyPrivateRoute />}>
          <Route path="/" element={<LazyHomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;
