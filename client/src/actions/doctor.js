import * as api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllDoctors = () => async (dispatch) => {
    try {
      const { data } = await api.getAllDoctors();
      dispatch({type: "GET_ALL_DOCTORS",payload: data});
    } catch (error) {
      toast.error(error.response.data);
      <ToastContainer />;
    }
  };