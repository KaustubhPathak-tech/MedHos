import "./App.css";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import ResponsiveAppBar from "./Components/Navbar/Navbar"

import RouteConfig from "./RouteConfig.jsx";


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
  const [checked, setChecked] = useState(false);
  const handleTheme = () => {
    setChecked(!checked);
    localStorage.setItem("theme", checked);
  };
  var isTrueSet = localStorage.getItem("theme") === "true";
  if (isTrueSet) {
    var theme = darkTheme;
  } else {
    theme = lightTheme;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ResponsiveAppBar change={handleTheme} />
        <br />
        <RouteConfig />
      </div>
    </ThemeProvider>
  );
}

export default App;
