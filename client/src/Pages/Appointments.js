import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import moment from "moment";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserAppointments } from "../actions/appointmentuser";

import "../styles/DoctorAppointments.css"

const Appointments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAppointments());
  }, [getUserAppointments]);
  const appointments = useSelector((state) => state.aptuserReducer);
  console.log(appointments);
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.doctorName}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.phone}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => <span>{record.date}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => <span>{record.time}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <br />
      <br />
      <h4>Appointment Lists</h4>
      <br />
      <div className="table-responsive" id="userApttable">
        <Table
          columns={columns}
          dataSource={appointments?.data?.data}
          scroll={{ x: true }}
        />
      </div>
    </Layout>
  );
};

export default Appointments;
