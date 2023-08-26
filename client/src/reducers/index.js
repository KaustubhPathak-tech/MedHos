import { combineReducers } from "redux";
import authReducer from "./auth"
import fetch_current_userReducer from "./currentUser"



export default combineReducers({
    authReducer,fetch_current_userReducer
})