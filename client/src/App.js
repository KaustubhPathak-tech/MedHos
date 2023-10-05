import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import RouteConfig from "./RouteConfig.jsx";
import MyFooter from "./Components/Footer/MyFooter.jsx";

import { getAllDoctors } from "./actions/doctor";

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
  return (
    <div className="App">
      <br />
      
      <RouteConfig change={handleTheme} />
      <MyFooter />
    </div>
  );
}

export default App;
