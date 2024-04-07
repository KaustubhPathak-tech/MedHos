"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = exports.decreaseQty = exports.increaseQty = exports.remove = exports.addtoCart = exports.getUserCart = exports.getMedicines = exports.addMedicine = exports.getUserAppointments = exports.getUserData = exports.getAllDoctors = exports.doctorsignUp = exports.verifyOTP = exports.makePayment = exports.verifyPayment = exports.updateOrderStatus = exports.getAdminOrders = exports.getOrder = exports.saveOrder = exports.glogIn = exports.updateUser = exports.dlogIn = exports.smartTwiiter = exports.signUp = exports.logIn = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: "https://med-hos-server.vercel.app" //http://localhost:7000

});

API.interceptors.request.use(function (req) {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = "Bearer ".concat(JSON.parse(localStorage.getItem("Profile")).token);
  }

  return req;
});

var logIn = function logIn(authData) {
  return API.post("/user/login", authData);
};

exports.logIn = logIn;

var signUp = function signUp(authData) {
  return API.post("/user/signup", authData);
};

exports.signUp = signUp;

var smartTwiiter = function smartTwiiter() {
  return API.post("/tlogin");
};

exports.smartTwiiter = smartTwiiter;

var dlogIn = function dlogIn(authData) {
  return API.post("/doctor/login", authData);
};

exports.dlogIn = dlogIn;

var updateUser = function updateUser(authData) {
  return API.post("/user/update", authData);
};

exports.updateUser = updateUser;

var glogIn = function glogIn(authData) {
  return API.post("/user/glogin", authData);
};

exports.glogIn = glogIn;

var saveOrder = function saveOrder(authData) {
  return API.post("/user/saveOrder", authData);
};

exports.saveOrder = saveOrder;

var getOrder = function getOrder() {
  return API.post("/user/getOrder");
};

exports.getOrder = getOrder;

var getAdminOrders = function getAdminOrders() {
  return API.post("/user/getAdminOrders");
};

exports.getAdminOrders = getAdminOrders;

var updateOrderStatus = function updateOrderStatus(authData) {
  return API.post("/user/updateOrderStatus", authData);
};

exports.updateOrderStatus = updateOrderStatus;

var verifyPayment = function verifyPayment(paymentData) {
  return API.post("/user/verifyPayment", paymentData);
};

exports.verifyPayment = verifyPayment;

var makePayment = function makePayment() {
  return API.post("/create-checkout-session");
};

exports.makePayment = makePayment;

var verifyOTP = function verifyOTP(authData) {
  return API.post("/doctor/verify/email", authData);
};

exports.verifyOTP = verifyOTP;

var doctorsignUp = function doctorsignUp(authData) {
  return API.post("/doctor/signup", authData);
};

exports.doctorsignUp = doctorsignUp;

var getAllDoctors = function getAllDoctors() {
  return API.get("/user/getAllDoctors");
};

exports.getAllDoctors = getAllDoctors;

var getUserData = function getUserData() {
  return API.post("/user/getAllDoctors");
};

exports.getUserData = getUserData;

var getUserAppointments = function getUserAppointments() {
  return API.get("/user/user-appointments");
};

exports.getUserAppointments = getUserAppointments;

var addMedicine = function addMedicine(medicines) {
  return API.post("/medicines/add", medicines);
};

exports.addMedicine = addMedicine;

var getMedicines = function getMedicines() {
  return API.get("/medicines/getMedicines");
};

exports.getMedicines = getMedicines;

var getUserCart = function getUserCart() {
  return API.post("/user/getCart");
};

exports.getUserCart = getUserCart;

var addtoCart = function addtoCart(medicine) {
  return API.post("/medicines/addtoCart", medicine);
};

exports.addtoCart = addtoCart;

var remove = function remove(medicine) {
  return API.post("/medicines/remove", medicine);
};

exports.remove = remove;

var increaseQty = function increaseQty(medicine) {
  return API.patch("/medicines/increseQty", medicine);
};

exports.increaseQty = increaseQty;

var decreaseQty = function decreaseQty(medicine) {
  return API.patch("/medicines/decreaseQty", medicine);
};

exports.decreaseQty = decreaseQty;

var getCity = function getCity() {
  return API.post("/fetchCity");
};

exports.getCity = getCity;