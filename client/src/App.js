import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RouteConfig from "./RouteConfig.jsx";
import MyFooter from "./Components/Footer/MyFooter.jsx";
import { getAllDoctors } from "./actions/doctor";

const apiKey = "kaustubh9";
const countryCode = "IN";

const apiUrl = "https://api.geonames.org/searchJSON?country=IN&maxRows=1000&username=kaustubh9";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const cities = data.geonames.map((city) => city.name);
    localStorage.setItem("Cities", JSON.stringify(cities));
  })
  .catch((error) => console.error("Error:", error));

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
