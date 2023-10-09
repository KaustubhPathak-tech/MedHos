import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../ToolkitReducers/alertSlice";
import { setCurrentUser } from "../actions/currentUser";
export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.fetch_current_userReducer);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "https://med-hos-server.vercel.app/user/getUserData",
        {
          userId: profile?.user?._id,
          userType: profile?.user?.userType,
          token: profile?.token,
        },
        {
          headers: {
            Authorization: `Bearer ${profile?.token}`,
          },
        }
      );
      console.log(res);
      // dispatch(hideLoading());
      if (res.data.success) {
        // dispatch(setCurrentUser(res.data.data));
      } else {
        // localStorage.clear();
        <Navigate to={`/${profile?.user?.userType}/login`} />;
      }
    } catch (error) {
      // localStorage.clear();
      // dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("Profile") || Date.now() < user?.time + 3.6e6) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
