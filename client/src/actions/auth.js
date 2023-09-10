import * as api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "SIGNUP", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Registered Successfully ", { position: "top-center" });
    setTimeout(() => {
      navigate("/user/dash");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};

export const doctorsignup = (authData, navigate) => async (dispatch) => {
  try {
    // console.log(authData);
    const { data } = await api.doctorsignUp(authData);

    dispatch({ type: "SIGNUP", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Congratulations, Registered as Doctor Successfully !", {
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/doctor/dash");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);

    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Login Successful", { position: "top-center" });
    setTimeout(() => {
      navigate("/user/dash");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setCurrentUser(null));
    localStorage.clear();
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};

export const glogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.glogIn(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Login Successful", { position: "top-center" });
    setTimeout(() => {
      navigate("/user/dash");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};

export const doctorlogin = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.dlogIn(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Login as Doctor Successfully !", { position: "top-center" });
    setTimeout(() => {
      navigate("/doctor/dash");
    }, 2000);
  } catch (error) {
    toast.error(error.response.data, { position: "top-center" });
    <ToastContainer />;
  }
};
