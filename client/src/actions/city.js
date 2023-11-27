import * as api from "../api";
import { message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const getCity = () => async (dispatch) => {
    try {
      const {data}=await api.getCity();
      const cities=data.documents[0].geonames.map((city)=>city.name);
      dispatch({ type: "GET_CITY", payload: cities });
    } catch (error) {
      toast.error(error);
      <ToastContainer />;
    }
  };