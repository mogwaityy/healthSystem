package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
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

    //医生给出处方，医生id自己获得，更新appointment状态为已完成
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

    @ResponseBody
    @RequestMapping("/getMyPrescription")
    public ApiResponse<List<PatientPrescription>> getMyPrescription() {
        String patientId= (String) StpUtil.getLoginId();
        return prescriptionService.getMyPrescription(patientId);
    }

    //获取病人的所有检验结果
    @ResponseBody
    @RequestMapping("/getTestResultByPatient")
    public ApiResponse<List<TestResult>> getTestResultByPatient(@RequestBody String patientId) {
        return prescriptionService.getTestResultByPatient(patientId);
    }

    //病人获取自己的检验结果
    @ResponseBody
    @RequestMapping("/getMyTestResult")
    public ApiResponse<List<TestResult>> getMyTestResult() {
        String patientId= (String) StpUtil.getLoginId();
        return prescriptionService.getTestResultByPatient(patientId);
    }
    //医生获取病人体检结果
    @ResponseBody
    @RequestMapping("/getPatientTestResult")
    public ApiResponse<List<TestResult>> getPatientTestResult(@RequestBody String patientId) {
        return prescriptionService.getTestResultByPatient(patientId);
    }
    //获取自己的信息
    @ResponseBody
    @RequestMapping("/getMyInfo")
    public ApiResponse<Object> getMyInfo() {
        return prescriptionService.getInfo();
    }

    //医生增加额外的体检
    @ResponseBody
    @RequestMapping("/addTest")
    public ApiResponse<String> addTest(@RequestBody List<TestResult> testResult ) {
        return prescriptionService.addTest(testResult);
    }
    //体检结果完成，修改体检结果
    @ResponseBody
    @RequestMapping("/updateTest")
    public ApiResponse<String> updateTest(@RequestBody List<TestResult> testResult ) {
        return prescriptionService.updateTest(testResult);
    }

}
