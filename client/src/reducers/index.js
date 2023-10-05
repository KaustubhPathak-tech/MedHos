import { combineReducers } from "redux";
import authReducer from "./auth"
import fetch_current_userReducer from "./currentUser"
import doctorReducer from "./doctor";

export default combineReducers({
    authReducer,fetch_current_userReducer,doctorReducer
})