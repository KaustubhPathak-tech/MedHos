import { combineReducers } from "redux";
import authReducer from "./auth";
import fetch_current_userReducer from "./currentUser";
import doctorReducer from "./doctor";
import medicineReducer from "./medicines";
import cityReducer from "./city";
import cartReducer from "./cart";
import orderReducer from "./order";
import aptuserReducer from "./appointmentuser";
import notiReducer from "./notification";
export default combineReducers({
  authReducer,
  fetch_current_userReducer,
  doctorReducer,
  medicineReducer,
  cityReducer,
  cartReducer,
  orderReducer,
  aptuserReducer,
  notiReducer
});
