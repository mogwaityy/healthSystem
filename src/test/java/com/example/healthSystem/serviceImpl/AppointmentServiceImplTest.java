package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class AppointmentServiceImplTest {

    @Mock
    private PatientMapper mockPatientMapper;
    @Mock
    private AppointmentMapper mockAppointmentMapper;
    @Mock
    private DoctorScheduleMapper mockDoctorScheduleMapper;
    @Mock
    private DoctorMapper mockDoctorMapper;
    @Mock
    private JavaMailSender mockMailSender;
    @Mock
    private MedicalHistoryMapper mockMedicalHistoryMapper;

    private AppointmentServiceImpl appointmentServiceImplUnderTest;

    @Before
    public void setUp() {
        appointmentServiceImplUnderTest = new AppointmentServiceImpl();
        appointmentServiceImplUnderTest.patientMapper = mockPatientMapper;
        appointmentServiceImplUnderTest.appointmentMapper = mockAppointmentMapper;
        appointmentServiceImplUnderTest.doctorScheduleMapper = mockDoctorScheduleMapper;
        appointmentServiceImplUnderTest.doctorMapper = mockDoctorMapper;
        appointmentServiceImplUnderTest.mailSender = mockMailSender;
        appointmentServiceImplUnderTest.medicalHistoryMapper = mockMedicalHistoryMapper;
    }

    @Test
    public void testGetPatientPage() {
        // Setup
        when(mockPatientMapper.selectPage(any(Page.class), any(QueryWrapper.class)))
                .thenReturn(new Page<>(0L, 0L, 0L, false));

        // Run the test
        final ApiResponse<Page> result = appointmentServiceImplUnderTest.getPatientPage(0, 0);

        // Verify the results
    }

    @Test
    public void testBookAppointment() {
        // Setup
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Configure AppointmentMapper.insert(...).
        final Appointment entity = new Appointment();
        entity.setAppointmentId(0L);
        entity.setPatientId("patientId");
        entity.setDoctorId("doctorId");
        entity.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        entity.setStatus(0);
        when(mockAppointmentMapper.insert(entity)).thenReturn(0);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.bookAppointment(appointment);

        // Verify the results
    }

    @Test
    public void testBookAppointment_PatientMapperReturnsNull() {
        // Setup
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);

        when(mockPatientMapper.selectById("patientId")).thenReturn(null);

        // Configure AppointmentMapper.insert(...).
        final Appointment entity = new Appointment();
        entity.setAppointmentId(0L);
        entity.setPatientId("patientId");
        entity.setDoctorId("doctorId");
        entity.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        entity.setStatus(0);
        when(mockAppointmentMapper.insert(entity)).thenReturn(0);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.bookAppointment(appointment);

        // Verify the results
    }

    @Test
    public void testUpdateDoctorSchedule() {
        // Setup
        final DoctorSchedule doctorSchedule = new DoctorSchedule();
        doctorSchedule.setScheduleId(0);
        doctorSchedule.setDoctorId("doctorId");
        doctorSchedule.setStartTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        doctorSchedule.setPatientId("patientId");
        doctorSchedule.setAppointmentId(0L);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.updateDoctorSchedule(doctorSchedule);

        // Verify the results
        // Confirm DoctorScheduleMapper.insert(...).
        final DoctorSchedule entity = new DoctorSchedule();
        entity.setScheduleId(0);
        entity.setDoctorId("doctorId");
        entity.setStartTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        entity.setPatientId("patientId");
        entity.setAppointmentId(0L);
        verify(mockDoctorScheduleMapper).insert(entity);

        // Confirm DoctorScheduleMapper.updateById(...).
        final DoctorSchedule entity1 = new DoctorSchedule();
        entity1.setScheduleId(0);
        entity1.setDoctorId("doctorId");
        entity1.setStartTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        entity1.setPatientId("patientId");
        entity1.setAppointmentId(0L);
        verify(mockDoctorScheduleMapper).updateById(entity1);

        // Confirm AppointmentMapper.updateById(...).
        final Appointment entity2 = new Appointment();
        entity2.setAppointmentId(0L);
        entity2.setPatientId("patientId");
        entity2.setDoctorId("doctorId");
        entity2.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        entity2.setStatus(0);
        verify(mockAppointmentMapper).updateById(entity2);
    }

    @Test
    public void testGetDoctorSchedule() {
        // Setup
        // Configure DoctorScheduleMapper.findSchedulesByDoctorIdAndDateRange(...).
        final DoctorSchedule doctorSchedule = new DoctorSchedule();
        doctorSchedule.setScheduleId(0);
        doctorSchedule.setDoctorId("doctorId");
        doctorSchedule.setStartTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        doctorSchedule.setPatientId("patientId");
        doctorSchedule.setAppointmentId(0L);
        final List<DoctorSchedule> doctorSchedules = List.of(doctorSchedule);
        when(mockDoctorScheduleMapper.findSchedulesByDoctorIdAndDateRange("doctorId",
                LocalDateTime.of(2020, 1, 1, 0, 0, 0), LocalDateTime.of(2020, 1, 1, 0, 0, 0)))
                .thenReturn(doctorSchedules);

        // Run the test
        final ApiResponse<List<DoctorSchedule>> result = appointmentServiceImplUnderTest.getDoctorSchedule("doctorId");

        // Verify the results
    }

    @Test
    public void testGetDoctorSchedule_DoctorScheduleMapperReturnsNoItems() {
        // Setup
        when(mockDoctorScheduleMapper.findSchedulesByDoctorIdAndDateRange("doctorId",
                LocalDateTime.of(2020, 1, 1, 0, 0, 0), LocalDateTime.of(2020, 1, 1, 0, 0, 0)))
                .thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<DoctorSchedule>> result = appointmentServiceImplUnderTest.getDoctorSchedule("doctorId");

        // Verify the results
    }

    @Test
    public void testGetAppointment() {
        // Setup
        // Configure AppointmentMapper.selectList(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        final List<Appointment> appointments = List.of(appointment);
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(appointments);

        // Configure DoctorMapper.selectById(...).
        final Doctor doctor = new Doctor();
        doctor.setDoctorId("doctorId");
        doctor.setName("name");
        doctor.setSpecialty("specialty");
        doctor.setIntroduction("introduction");
        doctor.setEmail("email");
        when(mockDoctorMapper.selectById("doctorId")).thenReturn(doctor);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Run the test
        final ApiResponse<List<AppointmentDTO>> result = appointmentServiceImplUnderTest.getAppointment("patientId", 0);

        // Verify the results
    }

    @Test
    public void testGetAppointment_AppointmentMapperReturnsNull() {
        // Setup
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(null);

        // Run the test
        final ApiResponse<List<AppointmentDTO>> result = appointmentServiceImplUnderTest.getAppointment("patientId", 0);

        // Verify the results
    }

    @Test
    public void testGetAppointment_AppointmentMapperReturnsNoItems() {
        // Setup
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<AppointmentDTO>> result = appointmentServiceImplUnderTest.getAppointment("patientId", 0);

        // Verify the results
    }

    @Test
    public void testGetDoctorAppointment() {
        // Setup
        // Configure AppointmentMapper.selectList(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        final List<Appointment> appointments = List.of(appointment);
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(appointments);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Run the test
        final ApiResponse<List<DoctorAppointmentDTO>> result = appointmentServiceImplUnderTest.getDoctorAppointment(
                "doctorId", 0);

        // Verify the results
    }

    @Test
    public void testGetDoctorAppointment_AppointmentMapperReturnsNull() {
        // Setup
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(null);

        // Run the test
        final ApiResponse<List<DoctorAppointmentDTO>> result = appointmentServiceImplUnderTest.getDoctorAppointment(
                "doctorId", 0);

        // Verify the results
    }

    @Test
    public void testGetDoctorAppointment_AppointmentMapperReturnsNoItems() {
        // Setup
        when(mockAppointmentMapper.selectList(any(QueryWrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List<DoctorAppointmentDTO>> result = appointmentServiceImplUnderTest.getDoctorAppointment(
                "doctorId", 0);

        // Verify the results
    }

    @Test
    public void testRejectAppointment() {
        // Setup
        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById("appointmentId")).thenReturn(appointment);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.rejectAppointment("appointmentId");

        // Verify the results
        verify(mockAppointmentMapper).update(any(), any(UpdateWrapper.class));

        // Confirm JavaMailSender.send(...).
        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("myeclinic@163.com");
        simpleMessage.setReplyTo("replyTo");
        simpleMessage.setTo("to");
        simpleMessage.setSubject("subject");
        simpleMessage.setText("text");
        verify(mockMailSender).send(simpleMessage);
    }

    @Test
    public void testRejectAppointment_PatientMapperReturnsNull() {
        // Setup
        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById("appointmentId")).thenReturn(appointment);

        when(mockPatientMapper.selectById("patientId")).thenReturn(null);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.rejectAppointment("appointmentId");

        // Verify the results
        verify(mockAppointmentMapper).update(any(), any(UpdateWrapper.class));
    }

    @Test(expected = MailException.class)
    public void testRejectAppointment_JavaMailSenderThrowsMailException() {
        // Setup
        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById("appointmentId")).thenReturn(appointment);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Configure JavaMailSender.send(...).
        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("myeclinic@163.com");
        simpleMessage.setReplyTo("replyTo");
        simpleMessage.setTo("to");
        simpleMessage.setSubject("subject");
        simpleMessage.setText("text");
        doThrow(MailException.class).when(mockMailSender).send(simpleMessage);

        // Run the test
        appointmentServiceImplUnderTest.rejectAppointment("appointmentId");
    }

    @Test
    public void testDeleteAppointment() {
        // Setup
        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.deleteAppointment("patinetId",
                "appointmentId");

        // Verify the results
        verify(mockAppointmentMapper).delete(any(QueryWrapper.class));
    }

    @Test
    public void testAlternativeAppointment() {
        // Setup
        final AlternativeAppointmentDTO alternativeAppointmentDTO = new AlternativeAppointmentDTO();
        alternativeAppointmentDTO.setAppointmentId(0L);
        alternativeAppointmentDTO.setNewTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));

        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById(0L)).thenReturn(appointment);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.alternativeAppointment(
                alternativeAppointmentDTO);

        // Verify the results
        verify(mockAppointmentMapper).update(any(), any(UpdateWrapper.class));

        // Confirm JavaMailSender.send(...).
        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("myeclinic@163.com");
        simpleMessage.setReplyTo("replyTo");
        simpleMessage.setTo("to");
        simpleMessage.setSubject("subject");
        simpleMessage.setText("text");
        verify(mockMailSender).send(simpleMessage);
    }

    @Test
    public void testAlternativeAppointment_PatientMapperReturnsNull() {
        // Setup
        final AlternativeAppointmentDTO alternativeAppointmentDTO = new AlternativeAppointmentDTO();
        alternativeAppointmentDTO.setAppointmentId(0L);
        alternativeAppointmentDTO.setNewTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));

        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById(0L)).thenReturn(appointment);

        when(mockPatientMapper.selectById("patientId")).thenReturn(null);

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.alternativeAppointment(
                alternativeAppointmentDTO);

        // Verify the results
        verify(mockAppointmentMapper).update(any(), any(UpdateWrapper.class));
    }

    @Test(expected = MailException.class)
    public void testAlternativeAppointment_JavaMailSenderThrowsMailException() {
        // Setup
        final AlternativeAppointmentDTO alternativeAppointmentDTO = new AlternativeAppointmentDTO();
        alternativeAppointmentDTO.setAppointmentId(0L);
        alternativeAppointmentDTO.setNewTime(LocalDateTime.of(2020, 1, 1, 0, 0, 0));

        // Configure AppointmentMapper.selectById(...).
        final Appointment appointment = new Appointment();
        appointment.setAppointmentId(0L);
        appointment.setPatientId("patientId");
        appointment.setDoctorId("doctorId");
        appointment.setDate(LocalDateTime.of(2020, 1, 1, 0, 0, 0));
        appointment.setStatus(0);
        when(mockAppointmentMapper.selectById(0L)).thenReturn(appointment);

        // Configure PatientMapper.selectById(...).
        final Patient patient = new Patient();
        patient.setPatientId("patientId");
        patient.setName("name");
        patient.setBirth("birth");
        patient.setEmail("email");
        patient.setStatus(0);
        when(mockPatientMapper.selectById("patientId")).thenReturn(patient);

        // Configure JavaMailSender.send(...).
        final SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("myeclinic@163.com");
        simpleMessage.setReplyTo("replyTo");
        simpleMessage.setTo("to");
        simpleMessage.setSubject("subject");
        simpleMessage.setText("text");
        doThrow(MailException.class).when(mockMailSender).send(simpleMessage);

        // Run the test
        appointmentServiceImplUnderTest.alternativeAppointment(alternativeAppointmentDTO);
    }

    @Test
    public void testAddMedicalHistory() {
        // Setup
        final MedicalHistory medicalHistory = new MedicalHistory();
        medicalHistory.setHistoryId(0L);
        medicalHistory.setPatientId("patientId");
        medicalHistory.setDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        medicalHistory.setDescription("description");

        // Run the test
        final ApiResponse<String> result = appointmentServiceImplUnderTest.addMedicalHistory(medicalHistory);

        // Verify the results
        // Confirm MedicalHistoryMapper.insert(...).
        final MedicalHistory entity = new MedicalHistory();
        entity.setHistoryId(0L);
        entity.setPatientId("patientId");
        entity.setDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        entity.setDescription("description");
        verify(mockMedicalHistoryMapper).insert(entity);
    }
}
