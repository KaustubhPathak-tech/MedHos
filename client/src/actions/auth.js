import * as api from "../api";
import { getCart } from "./cart";
import { getOrder } from "./order";
import { message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "SIGNUP", data });
    dispatch(getCart());
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
    setTimeout(() => {}, 2000);
    message.success("Registered Successfully ", { position: "top-center" });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};

export const makePayment = () => async () => {
  try {
    const { data } = await api.makePayment();
    toast.success("Payment Done ");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const verifyOTP = (authData, setOtpverified) => async () => {
  try {
    const { data } = await api.verifyOTP(authData);
    localStorage.setItem("OTPVerified", data);
    setOtpverified(true);
    toast.success("Email verified Successfully ");
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
    setTimeout(() => {}, 2000);
    message.success("Registered as Doctor Successfully");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const smartTwiiter=(navigate)=>async(dispatch)=>{
  try {
    const {data}=await api.smartTwiiter();
    dispatch({ type: "LOGIN", data });
    dispatch(getCart());
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
  } catch (error) {
    console.log(error);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(getCart());
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
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
    const notification = data?.user?.notification;
    const seennotification = data?.user?.seennotification;
    localStorage.setItem("Notification", JSON.stringify({ notification }));
    localStorage.setItem(
      "SeenNotification",
      JSON.stringify({ seennotification })
    );
    navigate("/doctor/dash");
    setTimeout(() => {}, 2000);
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
    dispatch(getCart());
    dispatch(getOrder());
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/user/dash");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};

export const getUserData = () => async (dispatch) => {};

export const saveOrder = (authData) => async (dispatch) => {
  try {
    const {data}=await api.saveOrder(authData);
    dispatch(getCart());
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};





export const updateOrderStatus = (authData) => async (dispatch) => {
  try {
    const {data}=await api.updateOrderStatus(authData);
    console.log(data);
    dispatch({ type: "GET_ORDER", payload: data });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};

export const updateUser = (authData,navigate) => async (dispatch) => {
  console.log(authData);
  try {
    const res=await api.updateUser(authData);
    const {data}=res;
    console.log(res);
    if(res.status===200){
      navigate("/user/dash");
    }
  } catch (error) {
    
  }
};

