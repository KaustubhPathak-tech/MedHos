import * as api from "../api";

export const addtoCart = (medicine, navigate) => async (dispatch) => {
  try {
    const { data } = await api.addtoCart(medicine);
    dispatch(getCart());
    navigate("/user/cart");
  } catch (error) {}
};
export const getCart=()=>async (dispatch)=>{
    try {
      const {data}=await api.getUserCart();
      dispatch({type:"USER_CART",payload:data.cart});
    } catch (error) {
      console.log(error);
    }
  }