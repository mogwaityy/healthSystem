package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Calendar;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PrescriptionServiceImplTest {

    @Mock
    private PrescriptionMapper mockPrescriptionMapper;
    @Mock
    private MedicinePrescriptionMapper mockMedicinePrescriptionMapper;
    @Mock
    private MedicalHistoryMapper mockMedicalHistoryMapper;
    @Mock
    private TestResultMapper mockTestResultMapper;
    @Mock
    private AdminMapper mockAdminMapper;
    @Mock
    private PatientMapper mockPatientMapper;
    @Mock
    private DoctorMapper mockDoctorMapper;
    @Mock
    private AppointmentMapper mockAppointmentMapper;

    private PrescriptionServiceImpl prescriptionServiceImplUnderTest;

    @Before
    public void setUp() {
        prescriptionServiceImplUnderTest = new PrescriptionServiceImpl();
        prescriptionServiceImplUnderTest.prescriptionMapper = mockPrescriptionMapper;
        prescriptionServiceImplUnderTest.medicinePrescriptionMapper = mockMedicinePrescriptionMapper;
        prescriptionServiceImplUnderTest.medicalHistoryMapper = mockMedicalHistoryMapper;
        prescriptionServiceImplUnderTest.testResultMapper = mockTestResultMapper;
        prescriptionServiceImplUnderTest.adminMapper = mockAdminMapper;
        prescriptionServiceImplUnderTest.patientMapper = mockPatientMapper;
        prescriptionServiceImplUnderTest.doctorMapper = mockDoctorMapper;
        prescriptionServiceImplUnderTest.appointmentMapper = mockAppointmentMapper;
    }

    @Test
    public void testAddPrescription() {
        // Setup
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");

        final MedicinePrescription medicinePrescription = new MedicinePrescription();
        medicinePrescription.setId(0);
        medicinePrescription.setPrescriptionId(0L);
        medicinePrescription.setMedicine("medicine");
        medicinePrescription.setQuantity("quantity");
        medicinePrescription.setUnit("unit");
        final List<MedicinePrescription> medicinePrescriptions = List.of(medicinePrescription);

        // Run the test
        final ApiResponse<String> result = prescriptionServiceImplUnderTest.addPrescription(prescription,
                medicinePrescriptions);

        // Verify the results
        // Confirm PrescriptionMapper.insert(...).
        final Prescription entity = new Prescription();
        entity.setPrescriptionId(0L);
        entity.setAppointmentId(0L);
        entity.setDiagnose("diagnose");
        entity.setInstruction("instruction");
        entity.setDoctorId("doctorId");
        verify(mockPrescriptionMapper).insert(entity);

        // Confirm MedicinePrescriptionMapper.insert(...).
        final MedicinePrescription entity1 = new MedicinePrescription();
        entity1.setId(0);
        entity1.setPrescriptionId(0L);
        entity1.setMedicine("medicine");
        entity1.setQuantity("quantity");
        entity1.setUnit("unit");
        verify(mockMedicinePrescriptionMapper).insert(entity1);
        verify(mockAppointmentMapper).update(any(UpdateWrapper.class));
    }

    @Test
    public void testGetPrescription() {
        // Setup
        // Configure PrescriptionMapper.selectById(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        when(mockPrescriptionMapper.selectById("prescriptionId")).thenReturn(prescription);

        // Configure MedicinePrescriptionMapper.selectList(...).
        final MedicinePrescription medicinePrescription = new MedicinePrescription();
        medicinePrescription.setId(0);
        medicinePrescription.setPrescriptionId(0L);
        medicinePrescription.setMedicine("medicine");
        medicinePrescription.setQuantity("quantity");
        medicinePrescription.setUnit("unit");
        final List<MedicinePrescription> medicinePrescriptions = List.of(medicinePrescription);
        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(medicinePrescriptions);

        // Run the test
        final ApiResponse<PatientPrescription> result = prescriptionServiceImplUnderTest.getPrescription(
                "prescriptionId");

        // Verify the results
    }

    @Test
    public void testGetPrescription_MedicinePrescriptionMapperReturnsNoItems() {
        // Setup
        // Configure PrescriptionMapper.selectById(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        when(mockPrescriptionMapper.selectById("prescriptionId")).thenReturn(prescription);

        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<PatientPrescription> result = prescriptionServiceImplUnderTest.getPrescription(
                "prescriptionId");

        // Verify the results
    }

    @Test
    public void testGetTestResultByPatient() {
        // Setup
        // Configure TestResultMapper.selectList(...).
        final TestResult testResult = new TestResult();
        testResult.setTestResultId(0);
        testResult.setPatientId("patientId");
        testResult.setTestDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        testResult.setDoctorId("doctorId");
        testResult.setTestResult("testResult");
        final List<TestResult> testResults = List.of(testResult);
        when(mockTestResultMapper.selectList(any(QueryWrapper.class))).thenReturn(testResults);

        // Run the test
        final ApiResponse<List<TestResult>> result = prescriptionServiceImplUnderTest.getTestResultByPatient(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetTestResultByPatient_TestResultMapperReturnsNoItems() {
        // Setup
        when(mockTestResultMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<TestResult>> result = prescriptionServiceImplUnderTest.getTestResultByPatient(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetInfo() {
        // Setup
        // Configure AdminMapper.selectById(...).
        final Admin admin = new Admin();
        admin.setAdminId("adminId");
        admin.setName("name");
        admin.setPassword("password");
        admin.setEmail("email");
        when(mockAdminMapper.selectById("id")).thenReturn(admin);

        // Configure DoctorMapper.selectById(...).
        final Doctor doctor = new Doctor();
        doctor.setDoctorId("doctorId");
        doctor.setName("name");
        doctor.setSpecialty("specialty");
        doctor.setIntroduction("introduction");
        doctor.setEmail("email");
        when(mockDoctorMapper.selectById("id")).thenReturn(doctor);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setAddress("address");
        patient.setEmail("email");
        when(mockPatientMapper.selectById("id")).thenReturn(patient);

        // Run the test
        final ApiResponse<Object> result = prescriptionServiceImplUnderTest.getInfo();

        // Verify the results
    }

    @Test
    public void testGetMyPrescription() {
        // Setup
        // Configure PrescriptionMapper.selectList(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        final List<Prescription> prescriptions = List.of(prescription);
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(prescriptions);

        // Configure MedicinePrescriptionMapper.selectList(...).
        final MedicinePrescription medicinePrescription = new MedicinePrescription();
        medicinePrescription.setId(0);
        medicinePrescription.setPrescriptionId(0L);
        medicinePrescription.setMedicine("medicine");
        medicinePrescription.setQuantity("quantity");
        medicinePrescription.setUnit("unit");
        final List<MedicinePrescription> medicinePrescriptions = List.of(medicinePrescription);
        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(medicinePrescriptions);

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescription(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescription_PrescriptionMapperReturnsNull() {
        // Setup
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(null);

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescription(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescription_PrescriptionMapperReturnsNoItems() {
        // Setup
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescription(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescription_MedicinePrescriptionMapperReturnsNoItems() {
        // Setup
        // Configure PrescriptionMapper.selectList(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        final List<Prescription> prescriptions = List.of(prescription);
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(prescriptions);

        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescription(
                "patientId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescriptionByAppointmentId() {
        // Setup
        // Configure PrescriptionMapper.selectList(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        final List<Prescription> prescriptions = List.of(prescription);
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(prescriptions);

        // Configure MedicinePrescriptionMapper.selectList(...).
        final MedicinePrescription medicinePrescription = new MedicinePrescription();
        medicinePrescription.setId(0);
        medicinePrescription.setPrescriptionId(0L);
        medicinePrescription.setMedicine("medicine");
        medicinePrescription.setQuantity("quantity");
        medicinePrescription.setUnit("unit");
        final List<MedicinePrescription> medicinePrescriptions = List.of(medicinePrescription);
        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(medicinePrescriptions);

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescriptionByAppointmentId(
                "appointmentId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescriptionByAppointmentId_PrescriptionMapperReturnsNull() {
        // Setup
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(null);

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescriptionByAppointmentId(
                "appointmentId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescriptionByAppointmentId_PrescriptionMapperReturnsNoItems() {
        // Setup
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescriptionByAppointmentId(
                "appointmentId");

        // Verify the results
    }

    @Test
    public void testGetMyPrescriptionByAppointmentId_MedicinePrescriptionMapperReturnsNoItems() {
        // Setup
        // Configure PrescriptionMapper.selectList(...).
        final Prescription prescription = new Prescription();
        prescription.setPrescriptionId(0L);
        prescription.setAppointmentId(0L);
        prescription.setDiagnose("diagnose");
        prescription.setInstruction("instruction");
        prescription.setDoctorId("doctorId");
        final List<Prescription> prescriptions = List.of(prescription);
        when(mockPrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(prescriptions);

        when(mockMedicinePrescriptionMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<PatientPrescription>> result = prescriptionServiceImplUnderTest.getMyPrescriptionByAppointmentId(
                "appointmentId");

        // Verify the results
    }

    @Test
    public void testAddTest() {
        // Setup
        final TestResult testResult = new TestResult();
        testResult.setTestResultId(0);
        testResult.setPatientId("patientId");
        testResult.setTestDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        testResult.setDoctorId("doctorId");
        testResult.setTestResult("testResult");
        final List<TestResult> testResults = List.of(testResult);

        // Run the test
        final ApiResponse<String> result = prescriptionServiceImplUnderTest.addTest(testResults);

        // Verify the results
        // Confirm TestResultMapper.insert(...).
        final TestResult entity = new TestResult();
        entity.setTestResultId(0);
        entity.setPatientId("patientId");
        entity.setTestDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        entity.setDoctorId("doctorId");
        entity.setTestResult("testResult");
        verify(mockTestResultMapper).insert(entity);
    }

    @Test
    public void testUpdateTest() {
        // Setup
        final TestResult testResult = new TestResult();
        testResult.setTestResultId(0);
        testResult.setPatientId("patientId");
        testResult.setTestDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        testResult.setDoctorId("doctorId");
        testResult.setTestResult("testResult");
        final List<TestResult> testResults = List.of(testResult);

        // Run the test
        final ApiResponse<String> result = prescriptionServiceImplUnderTest.updateTest(testResults);

        // Verify the results
        // Confirm TestResultMapper.updateById(...).
        final TestResult entity = new TestResult();
        entity.setTestResultId(0);
        entity.setPatientId("patientId");
        entity.setTestDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        entity.setDoctorId("doctorId");
        entity.setTestResult("testResult");
        verify(mockTestResultMapper).updateById(entity);
    }
}
