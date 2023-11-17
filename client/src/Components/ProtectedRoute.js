import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../ToolkitReducers/alertSlice";
import { setCurrentUser } from "../actions/currentUser";
export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.fetch_current_userReducer);

  const profile = JSON.parse(localStorage.getItem("Profile"));
  const getUser = async () => {
    try {
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
      if (res.data.success) {
      } else {
        <Navigate to={`/${profile?.user?.userType}/login`} />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      if (Date.now() < profile?.time + 3.6e6) {
        getUser();
      }
    }
  }, [user, getUser]);

  if (Date.now() < profile?.time + 3.6e6) {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/" />;
  }
}
