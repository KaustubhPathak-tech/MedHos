import * as api from "../api";

export const getUserAppointments = () => async (dispatch) => {
  try {
    const { data } = await api.getUserAppointments();
    dispatch({ type: "GET_USER_APPOINTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
