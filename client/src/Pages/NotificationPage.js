import React, { useEffect } from "react";
import "../styles/Notification.css";
import Layout from "../Components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../ToolkitReducers/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCurrentUser } from "../actions/currentUser";
import { ReloadOutlined } from "@ant-design/icons";
const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.fetch_current_userReducer);
  const notification = JSON.parse(localStorage.getItem("Notification"));
  const seenNotification = JSON.parse(localStorage.getItem("SeenNotification"));

  const profile = JSON.parse(localStorage.getItem("Profile"));

  const getNotification = async () => {
    console.log("getNotification");
    try {
      const res = await axios.post(
        "https://med-hos-server.vercel.app/user/get-all-notification",
        {
          userId: user?.user?._id,
          userType: user?.user?.userType,
        },
        {
          headers: {
            Authorization: `Bearer ${profile?.token}`,
          },
        }
      );
      // dispatch(hideLoading());

      if (res.data.success) {
        const notification = res?.data?.notification;
        const seennotification = res?.data?.seennotification;
        localStorage.setItem("Notification", JSON.stringify({ notification }));
        localStorage.setItem(
          "SeenNotification",
          JSON.stringify({ seennotification })
        );
      } else {
        toast.error(`${res.data.message}!+!`);
      }
    } catch (error) {}
  };

  const handleMarkAllRead = async () => {
    try {
      // dispatch(showLoading());

      const res = await axios.post(
        "https://med-hos-server.vercel.app/user/mark-allRead-notification",
        {
          userId: user?.user?._id,
          userType: user?.user?.userType,
        },
        {
          headers: {
            Authorization: `Bearer ${profile?.token}`,
          },
        }
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        getNotification();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // profile?.user?.notification = [];
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "https://med-hos-server.vercel.app/user/delete-all-notification",
        { userId: user?.user?._id, userType: user?.user?.userType },
        {
          headers: {
            Authorization: `Bearer ${profile?.token}`,
          },
        }
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        const data = res?.data;
        toast.success(res.data.message);
        getNotification();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // profile?.user?.seennotification =[];
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong in notifications");
    }
  };
  getNotification();
  useEffect(() => {
    getNotification();
  }, [getNotification]);
  return (
    <Layout>
      <div className="notification-page">
        <Tabs defaultActiveKey="0">
          <Tabs.TabPane tab="Unread" key="0">
            <div className="notification-actions">
              <h4 className="mark-all-read" data-toggle="tooltip" title="Mark All read" onClick={handleMarkAllRead}>
                
                Mark All Read &nbsp;&nbsp;&nbsp;|
                
              </h4>
              &nbsp;&nbsp;&nbsp;
              <h4
                className="mark-all-read"
                data-toggle="tooltip"
                data-placement="top"
                title="Refresh"
                onClick={() => {
                  getNotification();
                  window.location.reload();
                }}
              >
                <ReloadOutlined />
              </h4>
            </div>

            {notification?.notification.map((notificationMgs, index) => (
              <div className="notification-card" key={index}>
                <div
                  className="notification-message"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key="1">
            <div className="notification-actions">
              <h4 className="delete-all-read" onClick={handleDeleteAllRead} data-toggle="tooltip" title="Delete All read">
                Delete All Read &nbsp;&nbsp;&nbsp;|
              </h4>
              &nbsp;&nbsp;&nbsp;
              <h4
              data-toggle="tooltip" title="Refresh"
                className="mark-all-read"
                onClick={() => {
                  getNotification();
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
              >
                <ReloadOutlined />
              </h4>
            </div>
            {seenNotification?.seennotification.map(
              (notificationMgs, index) => (
                <div className="notification-card responsive" key={index}>
                  <div
                    className="notification-message"
                    onClick={() => navigate(notificationMgs.onClickPath)}
                  >
                    {notificationMgs.message}
                  </div>
                </div>
              )
            )}
          </Tabs.TabPane>
        </Tabs>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default NotificationPage;
