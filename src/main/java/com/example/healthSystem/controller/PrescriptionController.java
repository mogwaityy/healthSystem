package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.PatientPrescription;
import com.example.healthSystem.entity.Prescription;
import com.example.healthSystem.entity.TestResult;
import com.example.healthSystem.service.IOptionalService;
import com.example.healthSystem.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@SaCheckLogin
@Controller
public class PrescriptionController {

    @Autowired
    IPrescriptionService prescriptionService;

    @ResponseBody
    @RequestMapping("/addPrescription")
    public ApiResponse<String> addPrescription(@RequestBody PatientPrescription patientPrescription) {
        return prescriptionService.addPrescription(patientPrescription.getPrescription(),patientPrescription.getMedicinePrescriptions());
    }

    @ResponseBody
    @RequestMapping("/getPrescription")
    public ApiResponse<PatientPrescription> getPrescription(@RequestBody String prescriptionId) {
        return prescriptionService.getPrescription(prescriptionId);
    }

    //获取病人的所有检验结果
    @ResponseBody
    @RequestMapping("/getTestResultByPatient")
    public ApiResponse<List<TestResult>> getTestResultByPatient(@RequestBody String patientId) {
        return prescriptionService.getTestResultByPatient(patientId);
    }


}
