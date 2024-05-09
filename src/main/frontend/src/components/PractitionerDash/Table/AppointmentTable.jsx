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
function createData(applicationNo, name, DoB, symptom, date, detail) {
  return { applicationNo, name, DoB, symptom, date, detail };
}

const rows = [
  createData(111111, "Shelley", "2 March 2022", "test", "14:00 22 Apr", "Details"),
  createData(111111, "Test", "2 March 2022", "test","14:00 22 Apr", "Details"),
];


export default function BasicTable() {
  const [rows,setRows] = useState([]);
  const history = useHistory()
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
      pathname: '/docker/detail',
      state: { row } // Passing appointment details for pre-filling the form
    });
  }
  return (
    <div >
      <div className="Table">
      <h3>Appointment</h3>
        <TableContainer className="table-container"
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px" }}
        >
          <Table sx={{ minWidth: 1000}} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{width: "14%", wordWrap:"break-word"}}>Application No.</TableCell>
                <TableCell align="left" style={{width: "13%", wordWrap:"break-word"}}>Name</TableCell>
                <TableCell align="left" style={{width: "15%", wordWrap:"break-word"}}>Date of Birth</TableCell>
                <TableCell align="left" style={{width: "22%", wordWrap:"break-word"}}>Indication</TableCell>
                <TableCell align="left" style={{width: "12%", wordWrap:"break-word"}}>Appointment Time</TableCell>
                <TableCell align="left" style={{width: "10%", wordWrap:"break-word"}}>Details</TableCell>
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
                  <TableCell align="left">{row?.patient?.birth}</TableCell>
                  <TableCell align="left">{row?.appointment?.description}</TableCell>
                  <TableCell align="left">{row?.appointment?.date}</TableCell>
                  <TableCell align="left"><span className="details" onClick={()=>{handlerDetail(row)}}>detail</span></TableCell>
                </TableRow>
              )) : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
  );
}
