import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  // const { auth } = useAuth();

  const location = useLocation();
  var User = useSelector((state) => state.fetch_current_userReducer);
  
  return User?.user?.name ? (
    <Navigate to={"/user/dash"} />
  ) : (
    <Navigate to={"/user/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
