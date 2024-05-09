import React from "react";
import Table from "../Table/Table";
import Cards from "../Cards/Cards";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
        <div className="top-bar">
            <h1>Appointment Requests</h1>
        </div>
      <Table />
    </div>
  );
};

export default MainDash;
