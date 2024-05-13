package com.example.healthSystem.serviceImpl;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.common.CommonFunction;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import com.example.healthSystem.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements IPrescriptionService {

    @Autowired
    PrescriptionMapper prescriptionMapper;

    @Autowired
    MedicinePrescriptionMapper medicinePrescriptionMapper;

    @Autowired
    MedicalHistoryMapper medicalHistoryMapper;

    @Autowired
    TestResultMapper testResultMapper;

    @Autowired
    AdminMapper adminMapper;

    @Autowired
    PatientMapper patientMapper;

    @Autowired
    DoctorMapper doctorMapper;

    @Autowired
    AppointmentMapper appointmentMapper;

    @Override
    public ApiResponse<String> addPrescription(Prescription prescription, List<MedicinePrescription> medicinePrescriptions) {
        Long id= CommonFunction.generateLongId();
        prescription.setPrescriptionId(id);
        prescription.setDoctorId((String) StpUtil.getLoginId());
        prescriptionMapper.insert(prescription);
        for (MedicinePrescription medicinpre:medicinePrescriptions
             ) {
            medicinpre.setPrescriptionId(id);
            medicinePrescriptionMapper.insert(medicinpre);
        }
        //修改appointment状态为已完成-2
        UpdateWrapper<Appointment> updateWrapper=new UpdateWrapper<>();
        updateWrapper.eq("appointment_id",prescription.getAppointmentId());
        updateWrapper.set("status",2);
        appointmentMapper.update(updateWrapper);;
        return ApiResponse.success("处方添加成功");
    }

    @Override
    public ApiResponse<PatientPrescription> getPrescription(String prescriptionId) {
        PatientPrescription patientPrescription=new PatientPrescription();
        patientPrescription.setPrescription(prescriptionMapper.selectById(prescriptionId));
        QueryWrapper<MedicinePrescription> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("prescription_id",prescriptionId);
        List<MedicinePrescription> medicinePrescriptions=medicinePrescriptionMapper.selectList(queryWrapper);
        patientPrescription.setMedicinePrescriptions(medicinePrescriptions);
        return ApiResponse.success(patientPrescription);
    }

    @Override
    public ApiResponse<List<TestResult>> getTestResultByPatient(String patientId) {
        QueryWrapper<TestResult> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("patient_id",patientId);
        return ApiResponse.success(testResultMapper.selectList(queryWrapper));
    }

    @Override
    public ApiResponse<Object> getInfo() {
        String id= (String) StpUtil.getLoginId();
        List<String> roles=StpUtil.getRoleList();
        String role=roles.get(0);
        Object o;
        switch (role) {
            case "admin":
                 o = adminMapper.selectById(id);
                break;
            case "doctor":
                o = doctorMapper.selectById(id);
                break;
            case "patient":
                o = patientMapper.selectById(id);
                break;
            default:
                return ApiResponse.error(404, "Role not found");
        }

        return ApiResponse.success(o);
    }

    //获取病人的所有处方
    @Override
    public ApiResponse<List<PatientPrescription>> getMyPrescription(String patientId) {
        List<PatientPrescription> patientPrescriptions=new ArrayList<>();
        PatientPrescription patientPrescription=new PatientPrescription();
        QueryWrapper<Prescription> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("patient_id",patientId);
        //获取所有处方
        List<Prescription> prescriptions=prescriptionMapper.selectList(queryWrapper);
        //根据处方单号查找药方
        QueryWrapper<MedicinePrescription> medicinePrescriptionQueryWrapper=new QueryWrapper<>();
        List<MedicinePrescription> medicinePrescriptions=new ArrayList<>();
        if (prescriptions!=null) {
            for (Prescription prescription : prescriptions) {
                patientPrescription.setPrescription(prescription);
                medicinePrescriptionQueryWrapper.eq("prescription_id", prescription.getPrescriptionId());
                medicinePrescriptions = medicinePrescriptionMapper.selectList(medicinePrescriptionQueryWrapper);
                patientPrescription.setMedicinePrescriptions(medicinePrescriptions);
                patientPrescriptions.add(patientPrescription);
            }
        }
        return ApiResponse.success(patientPrescriptions);
    }

    @Override
    public ApiResponse<List<PatientPrescription>> getMyPrescriptionByAppointmentId(String appointmentId) {

        List<PatientPrescription> patientPrescriptions=new ArrayList<>();
        PatientPrescription patientPrescription=new PatientPrescription();
        QueryWrapper<Prescription> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("appointment_id",appointmentId);
        //获取所有处方
        List<Prescription> prescriptions=prescriptionMapper.selectList(queryWrapper);
        //根据处方单号查找药方
        List<MedicinePrescription> medicinePrescriptions=new ArrayList<>();
        if (prescriptions!=null) {
            for (Prescription prescription : prescriptions) {
                QueryWrapper<MedicinePrescription> medicinePrescriptionQueryWrapper=new QueryWrapper<>();
                patientPrescription.setPrescription(prescription);
                medicinePrescriptionQueryWrapper.eq("prescription_id", prescription.getPrescriptionId());
                medicinePrescriptions = medicinePrescriptionMapper.selectList(medicinePrescriptionQueryWrapper);
                patientPrescription.setMedicinePrescriptions(medicinePrescriptions);
                patientPrescriptions.add(patientPrescription);
            }
        }
        return ApiResponse.success(patientPrescriptions);
    }

    @Override
    public ApiResponse<String> addTest(List<TestResult> testResults) {
        if (testResults==null)return ApiResponse.success("add test success!");
        for (TestResult testResult:testResults
             ) {
            testResult.setDoctorId((String) StpUtil.getLoginId());
            testResultMapper.insert(testResult);
        }
        return ApiResponse.success("add test success!");
    }

    @Override
    public ApiResponse<String> updateTest(List<TestResult> testResults) {
        if (testResults==null)return ApiResponse.success("update test success!");
        for (TestResult testResult:testResults
        ) {
            testResultMapper.updateById(testResult);
        }
        return ApiResponse.success("update test success!");
    }
}
