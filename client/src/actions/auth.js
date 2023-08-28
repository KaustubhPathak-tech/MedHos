import * as api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setCurrentUser} from "./currentUser"
import {message} from "antd"

export const signup = (authData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(authData);
      dispatch({ type: "SIGNUP", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      message.success("Registered Successfully !");
      navigate("/user/dash");
    } catch (error) {
      toast.error(error.response.data, { position: "top-center" });
    }
  };
  export const login = (authData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.logIn(authData);
      
  
      dispatch({ type: "LOGIN", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      message.success("Login Successfully !");
      navigate("/user/dash");

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
      message.success("Login Successfully !");
      navigate("/user/dash");
    } catch (error) {
      toast.error(error.response.data, { position: "top-center" });
      <ToastContainer />;
    }
  };

  export const doctorlogin = (authData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.logIn(authData);
      
  
      dispatch({ type: "LOGIN", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      message.success("Login as Doctor Successfully !");
      navigate("/doctor/dash");

    } catch (error) {
      toast.error(error.response.data, { position: "top-center" });
      <ToastContainer />;
    }
  };