import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Base from "../layouts/Base";
import { RootState } from "../store/store";

const PrivateRoute = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.userReducer);

  if (isLoggedIn) {
    if (!location.pathname.includes("/room/")) {
      return (
        <Base>
          <Outlet />
        </Base>
      );
    }
    return <Outlet />;
  }
  return <Navigate to="/signin" state={{ prevUrl: location.pathname }} />;
};

export default PrivateRoute;
