import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import './Table.css'
import { getPatientPageApi, reviewRegisterApi } from "../../../api/action/appointment";

function createData(name, gender, birth, mobile, email, medicalHistory) {
  return { name, gender, birth, mobile, email, medicalHistory };
}

let mapGender = ["男","女","男"]
let mapStatus = ["","通过","拒绝"]
// const rows = [
//   createData("John Doe", "Male", "15 April 1985", "1234567890", "johndoe@example.com", "None"),
//   createData("Jane Smith", "Female", "23 June 1990", "0987654321", "janesmith@example.com", "Allergy"),
// ];

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  async function fetchData() {
    let data = await getPatientPageApi()
    console.log('data===>',data)
    if(data?.records){
      setRows(data?.records ?? [])
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  async function reviewRegisterAgree(patientId){
        let data = await reviewRegisterApi({
          patientId,
          status:1
        })
        alert("请稍候")
        if(!data?.reponseFailStatus){
          alert("操作成功")
          fetchData()
        }
  }
  //拒绝
  async function reviewRegisterReject(patientId){
    let data = await reviewRegisterApi({
      patientId,
      status:2
    })
    alert("请稍候")
    if(!data?.reponseFailStatus){
      alert("操作成功")
      fetchData()
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 添加前导零
    const day = ('0' + date.getDate()).slice(-2); // 添加前导零
    return `${year}-${month}-${day}`;
  }
  return (
    <div className="Table">
      <TableContainer
        component={Paper}
        className="table-container"
        style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px" }}
      >
        <Table sx={{ minWidth: 1200 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>性别</TableCell>
              <TableCell>出生日期</TableCell>
              <TableCell>电话</TableCell>
              <TableCell>邮箱</TableCell>

              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row?.gender ? mapGender[row.gender] : ""}</TableCell>
                <TableCell>{row?.birth ? formatDate(row.birth) :""}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
              
                <TableCell>
                  <Button onClick={()=>{
                    reviewRegisterAgree(row.patientId)
                  }} color="success" variant="contained" style={{ marginRight: 8 }}>通过</Button>
                  <Button onClick={()=>{
                    reviewRegisterReject(row.patientId)
                  }}  color="error" variant="contained">拒绝</Button>
                </TableCell>
              </TableRow>
            )) : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
