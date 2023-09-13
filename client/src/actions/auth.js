import * as api from "../api";
import { message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "SIGNUP", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
    setTimeout(() => {
      
    }, 2000);
    message.success("Registered Successfully ", { position: "top-center" });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};

export const doctorsignup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.doctorsignUp(authData);
    dispatch({ type: "SIGNUP", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/doctor/dash");
    setTimeout(() => {
      
    }, 2000);
    message.success("Registered as Doctor Successfully");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);

    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
    setTimeout(() => {
      
    }, 2000);
    message.success("Login Successful", { position: "top-center" });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const doctorlogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.dlogIn(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/doctor/dash");
    setTimeout(() => {
      
    }, 2000);
    message.success("Login Successful", { position: "top-center" });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch(setCurrentUser(null));
    localStorage.clear();
    message.success("Logout Successfully");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};

export const glogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.glogIn(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
    setTimeout(() => {
      
    }, 2000);
    message.success("Login Successful", { position: "top-center" });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};


