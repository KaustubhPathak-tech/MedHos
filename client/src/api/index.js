import axios from "axios"
const API = axios.create({ baseURL: "http://localhost:7000" });//https://medhosserver.vercel.app

export const logIn = (authData) => API.post("/user/login", authData);
export const dlogIn = (authData) => API.post("/doctor/login", authData);
export const glogIn = (authData) => API.post("/user/glogin", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const sendOTP = (authData) => API.post("/doctor/send/email", authData);
export const makePayment = () => API.post("/create-checkout-session");
export const verifyOTP = (authData) => API.post("/doctor/verify/email", authData);

export const doctorsignUp = (authData) => API.post("/doctor/signup", authData);
