import axios from "axios"
const API = axios.create({ baseURL: "https://medhosserver.vercel.app" });//http://localhost:7000

export const logIn = (authData) => API.post("/user/login", authData);
export const glogIn = (authData) => API.post("/user/glogin", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

