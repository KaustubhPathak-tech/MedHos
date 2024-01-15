import * as api from "../api";
export const getOrder = () => async (dispatch) => {
    try {
      const {data}=await api.getOrder();
      dispatch({ type: "GET_ORDER", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAdminOrders = () => async (dispatch) => {
    try {
      const {data}=await api.getAdminOrders();
      dispatch({ type: "GET_ORDER", payload: data });
    } catch (error) {
      console.log(error);
    }
  };