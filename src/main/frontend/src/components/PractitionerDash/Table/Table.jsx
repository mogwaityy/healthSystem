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
import { Select, MenuItem, InputLabel } from '@mui/material';
import useExtractDate from "../../../hooks/exDate";
// <InputLabel id="demo-simple-select-label">Age</InputLabel>
function createData(status, applicationNo, name, DoB, indication, updateTime, detail) {
    return { status, applicationNo, name, DoB, indication, updateTime, detail };
}


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
    "New Request", "Assigned", "Complete", "Reject", "Pending"
];
export default function BasicTable() {
    const [rows, setRows] = useState([]);
    const [rowsCopy, setRowsCopy] = useState([]);
    const history = useHistory();
    const [status, setStatus] = useState('0');
    const {extractDateTime} = useExtractDate();
    const handleChange = (event) => {
        setStatus(event.target.value);
        getAppointmentByStatusApi(event.target.value).then(res => {
            setRows(res)
            setRowsCopy(res)
            console.log("res.data", res)
        })
    };
    useEffect(() => {
        getAppointmentByStatusApi(0).then(res => {
            setRows(res)
            setRowsCopy(res)
            console.log("res.data", res)
        })
    }, [])

    function handDetailAction(row) {
        console.log("row", row)
        history.push({
            pathname: `/admin/dash/detail`,
            state: { row } // Passing appointment details for pre-filling the form
        });

    }



    return (
        <div className="Table">
            <TableContainer className="table-container"
                component={Paper}
                style={{
                    boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px",
                    height: "900px", overflow: "auto",
                    marginTop: "30px"
                }}
            >
                <Table sx={{ minWidth: 1000 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ width: "10%", wordWrap: "break-word" }}>
                                <Select
                                    sx={{
                                        border: 'none',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none' // 移除边框
                                        }
                                    }}

                                    id="demo-simple-select-label"
                                    value={status}
                                    onChange={handleChange}
                                    style={{fontSize:"0.8rem",fontWeight:"800"}}
                                >
                                    <MenuItem value="0">新申请</MenuItem>
                                    <MenuItem value="1">已分配</MenuItem>
                                    <MenuItem value="2">已完成</MenuItem>
                                    <MenuItem value="3">已拒绝</MenuItem>
                                    <MenuItem value="4">待处理</MenuItem>
                                </Select>

                            </TableCell>
                            <TableCell align="left" style={{ width: "14%", wordWrap: "break-word" }}>申请编号</TableCell>
                            <TableCell align="left" style={{ width: "13%", wordWrap: "break-word" }}>姓名</TableCell>
                            <TableCell align="left" style={{ width: "15%", wordWrap: "break-word" }}>预约时间</TableCell>
                            <TableCell align="left" style={{ width: "22%", wordWrap: "break-word" }}>说明</TableCell>

                            <TableCell align="left" style={{ width: "14%", wordWrap: "break-word" }}>详情</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {rows.length > 0 ? rows.map((row, index) => (
                            <TableRow
                                key={index}  // 使用索引作为key
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="left">
    <span style={{ ...makeStyle(mapItem[row.appointment.status]), marginLeft: '13px' }}>
        {mapItem[row.appointment.status]}
    </span>
                                </TableCell>

                                <TableCell align="left">{row.appointment.appointmentId}</TableCell>
                                <TableCell align="left">{row.patient.name}</TableCell>
                                <TableCell align="left">{extractDateTime(row.appointment.date)}</TableCell>
                                <TableCell align="left">{row.appointment.description}</TableCell>
                                <TableCell align="left"><span className="details" onClick={() => handDetailAction(row)}>详情</span></TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}