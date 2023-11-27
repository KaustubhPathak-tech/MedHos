import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../../actions/auth";
 // Import updateOrderStatus action
 import { getAdminOrders } from "../../../actions/order";
import { getOrder } from "../../../actions/order";
import { Button } from "@mui/material";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./UserOrder.css";
const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.fetch_current_userReducer);
  window.onload=()=>{
    dispatch(getOrder());
  }
  const order = useSelector((state) => state.orderReducer);
  console.log(order);
  const medicine = useSelector((state) => state.medicineReducer);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store the selected order ID
  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Format the date and time
    return date.toLocaleDateString("en-IN", options);
  };
  getAdminOrders();
  useEffect(() => {
    dispatch(getAdminOrders());
  }, [getAdminOrders]);
 
  return (
    <div id="userOrders" style={{ marginTop: "5%" }}>
      {order?.data?.order.length===0 ? (
        <>You've No Orders</>
      ) : (
        <>
          <h4>Orders</h4>
          <br />

          <div className="orderTable table-responsive">
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
                {order?.data?.order
                  ?.filter((item) => item.user === user?.user?._id)
                  .map((item) => (
                    <tr key={item.orderId}>
                      <th scope="row"># {item.orderId}</th>
                      <td>{formatDate(item.createdAt)}</td>

                      <script></script>
                      <td>
                        {item.orderItems[0].data.map((item) => (
                          <div key={item.medicineId}>
                            {medicine?.data?.data
                              .filter((med) => med._id === item.medicineId)
                              .map((med) => med.name)}{" "}
                            x {item.qty}
                          </div>
                        ))}
                      </td>
                      <td>{item.shippingAddress}</td>
                      <td>{item.status}&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrders;
