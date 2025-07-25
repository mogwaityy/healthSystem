import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useEffect,useState } from "react";
import { getDoctorAppointmentApi } from "../../../api/action/appointment";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useExtractDate from "../../../hooks/exDate";


function createData(applicationNo, name, symptom, date, detail) {
  return { applicationNo, name,  symptom, date, detail };
}

export default function BasicTable() {
  const [rows,setRows] = useState([]);
  const history = useHistory()
  const {extractDate,extractDateTime} =useExtractDate()
  useEffect(()=>{
    //getDoctorAppointmentApi
    getDoctorAppointmentApi().then(res=>{
      console.log("res.data===>",res)
      setRows(res)
    })
  },[])
  function handlerDetail(row){
    console.log("row",row)
    history.push({
      pathname: '/doctor/detail',
      state: { row } // Passing appointment details for pre-filling the form
    });
  }
  function handTestAction(row){
    console.log("row",row)
    history.push(`/doctor/test/${row.patient.patientId}`);
}
  return (
      <div className="Table">
        <TableContainer className="table-container"
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px" }}
        >
          <Table sx={{ minWidth: 1000}} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{width: "15%", wordWrap:"break-word"}}>申请编号</TableCell>
                <TableCell align="left" style={{width: "15%", wordWrap:"break-word"}}>姓名</TableCell>
                <TableCell align="left" style={{width: "30%", wordWrap:"break-word"}}>说明</TableCell>
                <TableCell align="left" style={{width: "15%", wordWrap:"break-word"}}>预约时间</TableCell>
                <TableCell align="left" style={{width: "10%", wordWrap:"break-word"}}>详情</TableCell>
                <TableCell align="left" style={{width: "10%", wordWrap:"break-word"}}>检查</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.length > 0  ? rows.map((row, index) => (
                <TableRow
                  key={index}  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.appointment?.appointmentId}</TableCell>
                  <TableCell align="left">{row?.patient?.name}</TableCell>
                  <TableCell align="left">{row?.appointment?.description}</TableCell>
                  <TableCell align="left">{extractDateTime(row?.appointment?.date)}</TableCell>
                  <TableCell align="left"><span className="details" onClick={()=>{handlerDetail(row)}}>详情</span></TableCell>
                  <TableCell align="left"><span className="details"   onClick={()=>handTestAction(row)}>检查</span></TableCell>
                </TableRow>
              )) : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
