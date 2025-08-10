// PrescriptionDetails.jsx
import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getPrescriptionByAppointmentApi } from '../api/action/appointment';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function PrescriptionDetails() {
  const { applicationId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const history = useHistory();

  const goBack = () => {
    history.push('/check-appointment');
  };

  // Mock function to simulate fetching data
  useEffect(() => {
    const fetchPrescription = async () => {
      let fetchedPrescription = {};
      //getPrescriptionByAppointmentApi
      let result = await getPrescriptionByAppointmentApi(applicationId)
      if(result?.[0]){
        result = result[0];
        fetchedPrescription = {
          applicationId,
          doctor: result?.prescription?.doctorId,
          diagnosis: result?.prescription?.diagnose,
          description: result?.prescription?.instruction,
          medicines:result?.medicinePrescriptions.map(item=>{
              item.name = item.medicine;
              item.qty = item.quantity;
              return item;
          }) ?? []
        }
      }
      console.log('result===>',result?.[0])
      setPrescription(fetchedPrescription);
    };
    fetchPrescription();
  }, [applicationId]);

  if (!prescription) return <div>Loading...</div>;

  return (
      <div className="container" style={{background: "#eaf0f7", minHeight: "100vh", padding:"80px"}}>
        <HighlightOffIcon onClick={goBack} style={{position:"absolute", "right":"3%",top:"3%", color:"#1F2B6C"}}/>
    <Paper style={{ padding: "20px", height:"700px"}}>
      <Typography variant="h4" style={{ marginBottom: "20px", textAlign:"center", color:"#1F2B6C", padding:"20px"}}>Prescription Details</Typography>
      <div style={{display:"flex", marginLeft:"40px"}}>
      <Typography style={{marginRight:"50px"}}><strong>医生:</strong> {prescription.doctor}</Typography>
      <Typography style={{marginRight:"50px"}}><strong>症状:</strong> {prescription.diagnosis}</Typography>
      </div>
      <Typography style={{marginLeft:"40px", marginTop:"20px", marginBottom:"40px"}}><strong>详细描述:</strong> {prescription.description}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>药品名称</TableCell>
            <TableCell>数量</TableCell>
            <TableCell>单位</TableCell>
            <TableCell>剂量</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {prescription?.medicines ? prescription.medicines.map((med, index) => (
            <TableRow key={index}>
              <TableCell>{med.name}</TableCell>
              <TableCell>{med.qty}</TableCell>
              <TableCell>{med.unit}</TableCell>
              <TableCell>{med.dosage}</TableCell>

            </TableRow>
          )) : ""}
        </TableBody>
      </Table>
    </Paper>
      </div>
  );
}

export default PrescriptionDetails;
