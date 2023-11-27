import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RouteConfig from "./RouteConfig.jsx";
import MyFooter from "./Components/Footer/MyFooter.jsx";
import { getMedicines } from "./actions/medicines";
import { getAllDoctors } from "./actions/doctor";
import { getCity } from "./actions/city.js";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./actions/cart.js";

const apiKey = "kaustubh9";
const countryCode = "IN";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.fetch_current_userReducer);
  const [checked, setChecked] = useState(true);
  const handleTheme = () => {
    try {
      setChecked(!checked);
      localStorage.setItem("theme", checked);
    } catch (error) {
      alert(error);
    }
  };
  var isTrueSet = localStorage.getItem("theme") === "true";
  if (isTrueSet) {
    var theme = darkTheme;
  } else {
    theme = lightTheme;
  }
  const fetch_city = async () => {};
  useEffect(() => {
    fetch_city();
  }, [fetch_city]);
  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getMedicines());
    dispatch(getCity());
    dispatch(getCart());
  }, [getAllDoctors, getMedicines, getCity,getCart]);
  return (
    <div className="App">
      <br />
      <RouteConfig change={handleTheme} />
      <MyFooter />
    </div>
  );
}

export default App;
