import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const location = useLocation();
  var User = useSelector((state) => state.fetch_current_userReducer);
  
  return ((User?.user?.userType==='doctor')? (
    <Navigate to={"/doctor/dash"} />
  ) : (
    <Navigate to={"/doctor/login"}  />
  ))
};

export default RequireAuth;
