import React from "react";
import Table from "../Table/Table";

import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
        <div className="top-bar">
            <h1>预约请求</h1>
        </div>
      <Table />
    </div>
  );
};

export default MainDash;
