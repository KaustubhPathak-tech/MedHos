import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RouteConfig from "./RouteConfig.jsx";
import MyFooter from "./Components/Footer/MyFooter.jsx";
import { getMedicines } from "./actions/medicines";
import { getAllDoctors } from "./actions/doctor";
import { getCity } from "./api";
import { useDispatch } from "react-redux";

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

// console.log(typeof JSON.parse(localStorage.getItem("Citi"))[0].geonames);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCity().then((res) => {
      localStorage.setItem("Citi", JSON.stringify(res?.data));
    });
    setTimeout(() => {
      dispatch(getAllDoctors());
      dispatch(getMedicines());
    }, 3000);
    setTimeout(() => {
      localStorage.setItem(
        "FinalCities",
        JSON.stringify(JSON.parse(localStorage.getItem("Citi"))[0].geonames)
      );
      const data = JSON.parse(localStorage.getItem("FinalCities"));
      const cities = data.map((city) => city.name);
      localStorage.setItem("Cities", JSON.stringify(cities));
    }, 10000);
  }, [getAllDoctors, getMedicines]);
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
  return (
    <div className="App">
      <br />
      <RouteConfig change={handleTheme} />
      <MyFooter />
    </div>
  );
}

export default App;
