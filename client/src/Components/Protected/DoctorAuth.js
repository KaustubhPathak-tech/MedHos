import {  Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorAuth = () => {
  // const location = useLocation();
  var User = useSelector((state) => state.fetch_current_userReducer);
  console.log(User?.user?.userType);

  return User?.user?.userType === "doctor" ? (
    <Navigate to={"/doctor/dash"} />
  ) : (
    <Navigate to={"/doctor/login"} />
  );
};

export default DoctorAuth;
