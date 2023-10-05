import React from "react";
import Users from "./Users";
import Doctors from "./Doctors";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Users />
      <br />
      <hr />
      <br />
      <Doctors />
    </div>
  );
};

export default Home;
