// PrescriptionDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getPrescriptionByAppointmentApi } from '../api/action/appointment';

function PrescriptionDetails() {
  const { applicationId } = useParams();
  const [prescription, setPrescription] = useState(null);

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
          description: result?.prescription?.description,
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
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>Prescription Details</Typography>
      <Typography><strong>Doctor:</strong> {prescription.doctor}</Typography>
      <Typography><strong>Diagnosis:</strong> {prescription.diagnosis}</Typography>
      <Typography><strong>Description:</strong> {prescription.description}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medicine</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Dosage</TableCell>
      
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
  );
}

export default PrescriptionDetails;
