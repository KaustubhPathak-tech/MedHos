import React from "react";
import { useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./Components/Navbar/Navbar.jsx"
import RouteConfig from "./RouteConfig.jsx";


const lightTheme=createTheme({
  palette:{
    mode:"light",
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
  };
  if(checked){
    var theme=darkTheme;
  }
  else{
    theme=lightTheme;
  }
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ResponsiveAppBar />
        <RouteConfig />
        <Switch  onClick={handleTheme} />

      </div>
    </ThemeProvider>
  );
}

export default App;
