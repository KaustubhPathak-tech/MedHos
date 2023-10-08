import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updateOrderStatus } from "../../../actions/auth"; // Import updateOrderStatus action
import { Button } from "@mui/material";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const AdminOrders = () => {
  const order = JSON.parse(localStorage.getItem("orders"));
  const user = useSelector((state) => state.fetch_cuurent_userReducer);
  const dispatch = useDispatch();
  const medicine = JSON.parse(localStorage.getItem("Medicines"));
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store the selected order ID
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Format the date and time
    return date.toLocaleDateString("en-IN", options);
  };
  const handleStatusChange = async (newStatus) => {
    // Helper function to format the date and time

    if (selectedOrderId) {
      // Ensure a valid order ID is selected
      try {
        // Dispatch an action to update the order status in the backend
        await dispatch(
          updateOrderStatus({ orderId: selectedOrderId, newStatus })
        );

        // Refresh the order list after updating the status
        dispatch(getOrder({ userId: user?.user?.id }));
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <Button
          onClick={() => {
            handleStatusChange("shipped");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
        >
          Shipped
        </Button>
      ), // Pass the desired status to handleStatusChange
    },
    {
      key: "2",
      label: (
        <Button
          onClick={() => {
            handleStatusChange("out for delivery");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
        >
          Out for delivery
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          onClick={() => {
            handleStatusChange("delivered");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
        >
          Delivered
        </Button>
      ),
    },
    {
      key: "4",
      danger: false,
      label: (
        <Button
          onClick={() => {
            handleStatusChange("cancelled");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
        >
          Cancelled
        </Button>
      ),
    },
  ];
  const selectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  useEffect(() => {
    dispatch(getOrder({ userId: user?.user?.id }));
  }, [dispatch, user]);

  return (
    <div id="adminOrders" style={{ marginTop: "5%" }}>
      <h4>Orders</h4>
      <div className="row">
        <div className="col-12">
          <table className="table table-hover" id="UserOrdertable">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Order Items</th>
                <th scope="col">Shipping Address</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {order?.order?.map((item) => (
                <tr key={item.orderId}>
                  <th scope="row"># {item.orderId}</th>
                  <td>{formatDate(item.createdAt)}</td>

                  <script></script>
                  <td>
                    {item.orderItems.map((item) => (
                      <div key={item.medicineId}>
                        {medicine?.data
                          .filter((med) => med._id === item.medicineId)
                          .map((med) => med.name)}{" "}
                        x {item.qty}
                      </div>
                    ))}
                  </td>
                  <td>{item.shippingAddress}</td>
                  <td>
                    {item.status}&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <Dropdown
                      menu={{
                        items,
                      }}
                      onClick={() => selectOrder(item.orderId)} // Store the selected order ID
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <DownOutlined orderId={item.orderId} />
                        </Space>
                      </a>
                    </Dropdown> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
