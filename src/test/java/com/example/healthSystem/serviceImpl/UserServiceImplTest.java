package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Calendar;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {

    @Mock
    private PatientMapper mockPatientMapper;
    @Mock
    private DoctorMapper mockDoctorMapper;
    @Mock
    private AdminMapper mockAdminMapper;
    @Mock
    private UserRoleMapper mockUserRoleMapper;
    @Mock
    private MedicalHistoryMapper mockMedicalHistoryMapper;
    @Mock
    private JavaMailSender mockMailSender;

    @InjectMocks
    private UserServiceImpl userServiceImplUnderTest;

//    @Test
//    public void testPatientRegister() {
//        // Setup
//        final PatientRegisterDTO patientRegisterDTO = new PatientRegisterDTO();
//        final Patient patient = new Patient();
//        patient.setPatientId("patientId");
//        patient.setName("name");
//        patient.setEmail("email");
//        patient.setPassword("password");
//        patientRegisterDTO.setPatient(patient);
//        patientRegisterDTO.setMedicalHistory("description");
//
//        when(mockPatientMapper.existsByEmail("email")).thenReturn(false);
//
//        // Run the test
//        final ApiResponse<String> result = userServiceImplUnderTest.patientRegister(patientRegisterDTO);
//
//        // Verify the results
//        // Confirm PatientMapper.insert(...).
//        final Patient entity = new Patient();
//        entity.setPatientId("patientId");
//        entity.setName("name");
//        entity.setBirth("birth");
//        entity.setEmail("email");
//        entity.setPassword("password");
//        verify(mockPatientMapper).insert(entity);
//        verify(mockUserRoleMapper).insert(new UserRole("id", "role"));
//
//        // Confirm MedicalHistoryMapper.insert(...).
//        final MedicalHistory entity1 = new MedicalHistory();
//        entity1.setHistoryId(0L);
//        entity1.setPatientId("patientId");
//        entity1.setDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
//        entity1.setDescription("description");
//        verify(mockMedicalHistoryMapper).insert(entity1);
//    }

    @Test
    public void testPatientRegister_PatientMapperExistsByEmailReturnsTrue() {
        // Setup
        final PatientRegisterDTO patientRegisterDTO = new PatientRegisterDTO();
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setEmail("email");
        patient.setPassword("password");
        patientRegisterDTO.setPatient(patient);
        patientRegisterDTO.setMedicalHistory("description");

        when(mockPatientMapper.existsByEmail("email")).thenReturn(true);

        // Run the test
        final ApiResponse<String> result = userServiceImplUnderTest.patientRegister(patientRegisterDTO);

        // Verify the results
    }

    @Test
    public void testTestSql() {
        // Setup
        // Configure PatientMapper.selectList(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setPassword("password");
        final List<Patient> patients = List.of(patient);
        when(mockPatientMapper.selectList(any(Wrapper.class))).thenReturn(patients);

        // Run the test
        final Boolean result = userServiceImplUnderTest.testSql();

        // Verify the results
        assertFalse(result);
    }

    @Test
    public void testTestSql_PatientMapperReturnsNoItems() {
        // Setup
        when(mockPatientMapper.selectList(any(Wrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final Boolean result = userServiceImplUnderTest.testSql();

        // Verify the results
        assertFalse(result);
    }

    @Test
    public void testLogin() {
        // Setup
        final User user = new User(0, "name", "password", "role");
        when(mockAdminMapper.findUserByEmailAndPassword("name", "password")).thenReturn("result");
        when(mockDoctorMapper.findUserByEmailAndPassword("name", "password")).thenReturn("result");
        when(mockPatientMapper.findUserByEmailAndPassword("name", "password")).thenReturn("result");

        // Run the test
        final ApiResponse<String> result = userServiceImplUnderTest.login(user);

        // Verify the results
    }

    @Test
    public void testAdminLogin() {
        assertNull(userServiceImplUnderTest.adminLogin(new User(0, "name", "password", "role")));
    }

    @Test
    public void testLogout() {
        // Setup
        // Run the test
       // final ApiResponse<String> result = userServiceImplUnderTest.logout();

        // Verify the results
    }

    @Test
    public void testGetPatientInfo() {
        // Setup
        // Configure PatientMapper.selectList(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setPassword("password");
        final List<Patient> patients = List.of(patient);
        when(mockPatientMapper.selectList(any(QueryWrapper.class))).thenReturn(patients);

        // Configure MedicalHistoryMapper.selectList(...).
        final MedicalHistory medicalHistory = new MedicalHistory();
        medicalHistory.setHistoryId(0L);
        medicalHistory.setPatientId("patientId");
        medicalHistory.setDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        medicalHistory.setDescription("description");
        final List<MedicalHistory> medicalHistories = List.of(medicalHistory);
        when(mockMedicalHistoryMapper.selectList(any(QueryWrapper.class))).thenReturn(medicalHistories);

        // Run the test
        final ApiResponse<PatientInfo> result = userServiceImplUnderTest.getPatientInfo("patientId");

        // Verify the results
    }

    @Test
    public void testGetPatientInfo_PatientMapperReturnsNoItems() {
        // Setup
        when(mockPatientMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Configure MedicalHistoryMapper.selectList(...).
        final MedicalHistory medicalHistory = new MedicalHistory();
        medicalHistory.setHistoryId(0L);
        medicalHistory.setPatientId("patientId");
        medicalHistory.setDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        medicalHistory.setDescription("description");
        final List<MedicalHistory> medicalHistories = List.of(medicalHistory);
        when(mockMedicalHistoryMapper.selectList(any(QueryWrapper.class))).thenReturn(medicalHistories);

        // Run the test
        final ApiResponse<PatientInfo> result = userServiceImplUnderTest.getPatientInfo("patientId");

        // Verify the results
    }

    @Test
    public void testGetPatientInfo_MedicalHistoryMapperReturnsNoItems() {
        // Setup
        // Configure PatientMapper.selectList(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setPassword("password");
        final List<Patient> patients = List.of(patient);
        when(mockPatientMapper.selectList(any(QueryWrapper.class))).thenReturn(patients);

        when(mockMedicalHistoryMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<PatientInfo> result = userServiceImplUnderTest.getPatientInfo("patientId");

        // Verify the results
    }

//    @Test
//    public void testReviewRegister() {
//        // Setup
//        // Configure PatientMapper.selectById(...).
//        final Patient patient = new Patient();
//        patient.setPatientId("patientId");
//        patient.setName("name");
//        patient.setBirth("birth");
//        patient.setEmail("email");
//        patient.setPassword("password");
//        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);
//
//        // Run the test
//        final ApiResponse<String> result = userServiceImplUnderTest.reviewRegister("patientId", 0);
//
//        // Verify the results
//        verify(mockPatientMapper).update(any(), any(UpdateWrapper.class));
//
//        // Confirm JavaMailSender.send(...).
//        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
//        simpleMessage.setFrom("myeclinic@163.com");
//        simpleMessage.setReplyTo("replyTo");
//        simpleMessage.setTo("to");
//        simpleMessage.setSubject("subject");
//        simpleMessage.setText("text");
//        verify(mockMailSender).send(simpleMessage);
//    }

    @Test
    public void testReviewRegister_JavaMailSenderThrowsMailException() {
        // Setup
        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setPassword("password");
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Configure JavaMailSender.send(...).
        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("myeclinic@163.com");
        simpleMessage.setReplyTo("replyTo");
        simpleMessage.setTo("to");
        simpleMessage.setSubject("subject");
        simpleMessage.setText("text");
       // doThrow(MailException.class).when(mockMailSender).send(simpleMessage);

        // Run the test
        //assertThrows(MailException.class, () -> userServiceImplUnderTest.reviewRegister("patientId", 0));
        //verify(mockPatientMapper).update(any(), any(UpdateWrapper.class));
    }

    @Test
    public void testGetAllDoctor() {
        // Setup
        // Configure DoctorMapper.selectList(...).
        final Doctor doctor = new Doctor();
        doctor.setDoctorId("doctorId");
        doctor.setName("name");
        doctor.setSpecialty("specialty");
        doctor.setIntroduction("introduction");
        doctor.setEmail("email");
        final List<Doctor> doctors = List.of(doctor);
        when(mockDoctorMapper.selectList(any(Wrapper.class))).thenReturn(doctors);

        // Run the test
        final ApiResponse<List<Doctor>> result = userServiceImplUnderTest.getAllDoctor();

        // Verify the results
    }

    @Test
    public void testGetAllDoctor_DoctorMapperReturnsNoItems() {
        // Setup
        when(mockDoctorMapper.selectList(any(Wrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<Doctor>> result = userServiceImplUnderTest.getAllDoctor();

        // Verify the results
    }

//    @Test
//    public void testAddDoctor() {
//        // Setup
//        final Doctor doctor = new Doctor();
//        doctor.setDoctorId("doctorId");
//        doctor.setName("name");
//        doctor.setSpecialty("specialty");
//        doctor.setIntroduction("introduction");
//        doctor.setEmail("email");
//
//        // Run the test
//        final ApiResponse<String> result = userServiceImplUnderTest.addDoctor(doctor);
//
//        // Verify the results
//        // Confirm DoctorMapper.insert(...).
//        final Doctor entity = new Doctor();
//        entity.setDoctorId("doctorId");
//        entity.setName("name");
//        entity.setSpecialty("specialty");
//        entity.setIntroduction("introduction");
//        entity.setEmail("email");
//        verify(mockDoctorMapper).insert(entity);
//        verify(mockUserRoleMapper).insert(new UserRole("id", "role"));
//    }

//    @Test
//    public void testAddListDoctor() {
//        // Setup
//        final Doctor doctor = new Doctor();
//        doctor.setDoctorId("doctorId");
//        doctor.setName("name");
//        doctor.setSpecialty("specialty");
//        doctor.setIntroduction("introduction");
//        doctor.setEmail("email");
//        final List<Doctor> doctors = List.of(doctor);
//
//        // Run the test
//        final ApiResponse<String> result = userServiceImplUnderTest.addListDoctor(doctors);
//
//        // Verify the results
//        // Confirm DoctorMapper.insert(...).
//        final Doctor entity = new Doctor();
//        entity.setDoctorId("doctorId");
//        entity.setName("name");
//        entity.setSpecialty("specialty");
//        entity.setIntroduction("introduction");
//        entity.setEmail("email");
//        verify(mockDoctorMapper).insert(entity);
//        verify(mockUserRoleMapper).insert(new UserRole("id", "role"));
//    }

    @Test
    public void testGetDoctorBySpecialty() {
        // Setup
        // Configure DoctorMapper.selectList(...).
        final Doctor doctor = new Doctor();
        doctor.setDoctorId("doctorId");
        doctor.setName("name");
        doctor.setSpecialty("specialty");
        doctor.setIntroduction("introduction");
        doctor.setEmail("email");
        final List<Doctor> doctors = List.of(doctor);
        when(mockDoctorMapper.selectList(any(QueryWrapper.class))).thenReturn(doctors);

        // Run the test
        final ApiResponse<List<Doctor>> result = userServiceImplUnderTest.getDoctorBySpecialty("specialty");

        // Verify the results
    }

    @Test
    public void testGetDoctorBySpecialty_DoctorMapperReturnsNoItems() {
        // Setup
        when(mockDoctorMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<Doctor>> result = userServiceImplUnderTest.getDoctorBySpecialty("specialty");

        // Verify the results
    }

    @Test
    public void testGetCurrentUser() {
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
        patient.setEmail("email");
        patient.setPassword("password");
        when(mockPatientMapper.selectById("id")).thenReturn(patient);

        // Run the test
        //final ApiResponse<CurrentUserDTO> result = userServiceImplUnderTest.getCurrentUser();

        // Verify the results
    }
}
