import * as React from "react";
import { useState, useEffect } from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./Table.css";
import { getAppointmentByStatusApi } from "../../../api/action/appointment";
import { Details } from "@mui/icons-material";

function createData(status, applicationNo, name, DoB, indication, updateTime, detail) {
    return { status, applicationNo, name, DoB, indication, updateTime, detail };
}

// const rows = [
//   createData("Assigned", 111111, "Shelley", "2 March 2022", "test", "20:31", "Details"),
//   createData("Rejected", 111111, "Test", "2 March 2022", "test","20:31", "Details"),
//   createData("Pending", 111111, "Test", "2 March 2022", "test", "Yesterday","Details"),
//   createData("New Request", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details"),
//   createData("Assigned", 111111, "Test", "2 March 2022", "test", "22 Apr", "Details")
// ];


const makeStyle = (status) => {
    if (status === 'Assigned') {
        return {
            color: 'green',
        }
    }
    else if (status === 'Rejected') {
        return {
            color: 'red',
        }
    }
    else if (status === 'Pending') {
        return {
            color: '#F28F35',
        }
    }
    else {
        return {
            color: '#1F2B6C',
        }
    }
}
//0-New Request，1-Assigned，2-Complete，3-Reject，4-Pending
const mapItem = [
    "Request","Assigned","Complete","Reject","Pending"
];
export default function BasicTable() {
    const [rows, setRows] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getAppointmentByStatusApi(1).then(res => {
            setRows(res)
            console.log("res.data",res)
        })
    }, [])

    function handDetailAction(row){
        console.log("row",row)
        history.push({
            pathname: '/detail',
            state: { row } // Passing appointment details for pre-filling the form
        });

    }

    return (
        <div className="Table">
            <TableContainer className="table-container"
                            component={Paper}
                            style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px",
                                height:"900px", overflow:"auto",
                                marginTop:"30px"
            }}
            >
                <Table sx={{ minWidth: 1000 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: "14%", wordWrap: "break-word" }}>Status</TableCell>
                            <TableCell align="left" style={{ width: "14%", wordWrap: "break-word" }}>Application No.</TableCell>
                            <TableCell align="left" style={{ width: "13%", wordWrap: "break-word" }}>Name</TableCell>
                            <TableCell align="left" style={{ width: "15%", wordWrap: "break-word" }}>Date of Birth</TableCell>
                            <TableCell align="left" style={{ width: "22%", wordWrap: "break-word" }}>Indication</TableCell>

                            <TableCell align="left" style={{ width: "10%", wordWrap: "break-word" }}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {rows.length > 0 ? rows.map((row, index) => (
                            <TableRow
                                key={index}  // 使用索引作为key
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <span style={makeStyle(mapItem[row.appointment.status])}>{mapItem[row.appointment.status]}</span>
                                </TableCell>
                                <TableCell align="left">{row.appointment.appointmentId}</TableCell>
                                <TableCell align="left">{row.patient.name}</TableCell>
                                <TableCell align="left">{row.patient.birth}</TableCell>
                                <TableCell align="left">{row.appointment.description}</TableCell>
                                <TableCell align="left"><span className="details" onClick={()=>handDetailAction(row)}>detail</span></TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}