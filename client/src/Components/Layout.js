import React from "react";
import "../styles/LayoutStyles.css";
import "./Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.fetch_current_userReducer);
  const location = useLocation();
  const navigate = useNavigate();

  // logout funtion
  const handleLogout = () => {
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/doctor/dash",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?.user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div id="appointmnets">
      <div className="main">
        <div className="layout">
          
          <div className="content">
            
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
