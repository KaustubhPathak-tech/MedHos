import * as api from "../api";
export const getOrder = () => async (dispatch) => {
    try {
      const {data}=await api.getOrder();
      console.log(data);
      dispatch({ type: "GET_ORDER", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAdminOrders = () => async (dispatch) => {
    try {
      const {data}=await api.getAdminOrders();
      // localStorage.setItem("StringOrders", JSON.stringify(data));
      dispatch({ type: "GET_ORDER", payload: data });
    } catch (error) {
      console.log(error);
    }
  };