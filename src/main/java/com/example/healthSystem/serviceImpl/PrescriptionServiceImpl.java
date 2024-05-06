package com.example.healthSystem.serviceImpl;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.common.CommonFunction;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.Prescription;
import com.example.healthSystem.mapper.MedicalHistoryMapper;
import com.example.healthSystem.mapper.MedicinePrescriptionMapper;
import com.example.healthSystem.mapper.PrescriptionMapper;
import com.example.healthSystem.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionServiceImpl implements IPrescriptionService {

    @Autowired
    PrescriptionMapper prescriptionMapper;

    @Autowired
    MedicinePrescriptionMapper medicinePrescriptionMapper;

    @Autowired
    MedicalHistoryMapper medicalHistoryMapper;

    @Override
    public ApiResponse<String> addPrescription(Prescription prescription, List<MedicinePrescription> medicinePrescriptions) {
        Long id= CommonFunction.generateLongId();
        prescription.setPrescriptionId(id);
        prescriptionMapper.insert(prescription);
        for (MedicinePrescription medicinpre:medicinePrescriptions
             ) {
            medicinpre.setPrescriptionId(id);
            medicinePrescriptionMapper.insert(medicinpre);
        }
        return ApiResponse.success("处方添加成功");
    }
}
