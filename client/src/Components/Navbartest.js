// import { styled } from "@mui/material";
// import { useState } from "react";

// const useStyles = styled((theme) => ({
//   dropdown: {
//     position: "relative",
//     display: "inline-block",
//   },
//   dropdownContent: {
//     display: "none",
//     position: "absolute",
//     top: "100%",
//     left: 0,
//     backgroundColor: "#f9f9f9",
//     minWidth: "160px",
//     boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
//     zIndex: 1,
//   },
//   menuItem: {
//     padding: "12px 16px",
//     textDecoration: "none",
//     display: "block",
//     color: "#333",
//     "&:hover": {
//       backgroundColor: "#ddd",
//     },
//   },
// }));

// const MyComponent = () => {
//   const classes = useStyles();
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className={classes.dropdown}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <span>Hover me</span>
//       <div
//         className={classes.dropdownContent}
//         style={{ display: isHovered ? "block" : "none" }}
//       >
//         <a href="#" className={classes.menuItem}>
//           Item 1
//         </a>
//         <a href="#" className={classes.menuItem}>
//           Item 2
//         </a>
//         <a href="#" className={classes.menuItem}>
//           Item 3
//         </a>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;



import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;

const App = () => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  return (
    <>
  <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/>
  
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    mapTypeId="roadmap"
    style={{height:'700px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
  </>
  );
}

export default App