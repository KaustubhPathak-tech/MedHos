import * as api from "../api";
import { getCart } from "./cart";
import { message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCurrentUser } from "./currentUser";

export const addMedicine = (medicine) => async (dispatch) => {
  try {
    const { data } = await api.addMedicine(medicine);
    dispatch({ type: "ADD_MEDICINE", payload: data });
    toast.success("Medicine Added Successfully");
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};
export const getMedicines = () => async (dispatch) => {
  try {
    const { data } = await api.getMedicines();
    dispatch({ type: "GET_MEDICINES", payload: data });
  } catch (error) {
    toast.error(error.response.data);
    <ToastContainer />;
  }
};




export const remove = (medicine) => async (dispatch) => {
  try {
    const { data } = await api.remove(medicine);
    dispatch(getCart());
  } catch (error) {}
};
export const increaseQty = (medicine) => async (dispatch) => {
  try {
    const { data } = await api.increaseQty(medicine);
    dispatch(getCart());
  } catch (error) {}
};
export const decreaseQty = (medicine) => async (dispatch) => {
  try {
    const { data } = await api.decreaseQty(medicine);
    dispatch(getCart());
  } catch (error) {}
};

export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    const { data } = await api.verifyPayment(paymentData);
    dispatch(getCart());
  } catch (error) {
    console.log(error);
  }
} 
