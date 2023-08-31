import {  Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  // const { auth } = useAuth();

  // const location = useLocation();
  var User = useSelector((state) => state.fetch_current_userReducer);
  return User?.user?.userType === "user" ? (
    <Navigate to={"/user/dash"} />
  ) : (
    <Navigate to={"/user/login"} />
  );
};

export default RequireAuth;
