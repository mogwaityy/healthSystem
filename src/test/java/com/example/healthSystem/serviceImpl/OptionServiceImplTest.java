package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Medical;
import com.example.healthSystem.entity.Specialty;
import com.example.healthSystem.mapper.MedicalMapper;
import com.example.healthSystem.mapper.SpecialtyMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OptionServiceImplTest {

    @Mock
    private SpecialtyMapper mockSpecialtyMapper;
    @Mock
    private MedicalMapper mockMedicalMapper;

    private OptionServiceImpl optionServiceImplUnderTest;

    @Before
    public void setUp() {
        optionServiceImplUnderTest = new OptionServiceImpl();
        optionServiceImplUnderTest.specialtyMapper = mockSpecialtyMapper;
        optionServiceImplUnderTest.medicalMapper = mockMedicalMapper;
    }

    @Test
    public void testGetSpecialty() {
        // Configure SpecialtyMapper.selectList(...).
        final Specialty specialty = new Specialty();
        specialty.setSpecialtyId(0L);
        specialty.setName("name");
        final List<Specialty> specialties = List.of(specialty);
        when(mockSpecialtyMapper.selectList(any(Wrapper.class))).thenReturn(specialties);

        // Run the test
        final ApiResponse<List> result = optionServiceImplUnderTest.getSpecialty();

        // Verify the results
    }

    @Test
    public void testGetSpecialty_SpecialtyMapperReturnsNoItems() {
        when(mockSpecialtyMapper.selectList(any(Wrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List> result = optionServiceImplUnderTest.getSpecialty();

        // Verify the results
    }

    @Test
    public void testGetMedicine() {
        // Configure MedicalMapper.selectList(...).
        final Medical medical = new Medical();
        medical.setMedicalId(0L);
        medical.setName("name");
        final List<Medical> medicals = List.of(medical);
        when(mockMedicalMapper.selectList(any(Wrapper.class))).thenReturn(medicals);

        // Run the test
        final ApiResponse<List> result = optionServiceImplUnderTest.getMedicine();

        // Verify the results
    }

    @Test
    public void testGetMedicine_MedicalMapperReturnsNoItems() {
        when(mockMedicalMapper.selectList(any(Wrapper.class))).thenReturn(Collections.emptyList());

        // Run the test
        final ApiResponse<List> result = optionServiceImplUnderTest.getMedicine();

        // Verify the results
    }
}
