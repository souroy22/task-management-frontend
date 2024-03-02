import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RouterComponent from "./routers";
import "./App.css";
import { setUserData } from "./store/user/userReducer";
import { getUserData } from "./apis/userApis";
import { customLocalStorage } from "./services/utils/localStorage";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/loader";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorComponent from "./pages/error-component";

const App = () => {
  const dispatch = useDispatch();

  const onLoad = async () => {
    if (customLocalStorage.getData("token")) {
      const res = await getUserData();
      dispatch(setUserData(res.user));
      return res;
    } else {
      return null;
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["GET_USER_DATA"],
    queryFn: onLoad,
    retry: false,
  });

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorComponent />}>
          <RouterComponent />
        </ErrorBoundary>
      </BrowserRouter>
      <Toaster />
      {isLoading && <Loader loader={isLoading} />}
    </>
  );
};

export default App;
