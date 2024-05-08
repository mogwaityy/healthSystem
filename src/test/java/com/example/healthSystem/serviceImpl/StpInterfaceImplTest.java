package com.example.healthSystem.serviceImpl;

import com.example.healthSystem.mapper.UserRoleMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class StpInterfaceImplTest {

    @Mock
    private UserRoleMapper mockUserRoleMapper;

    @InjectMocks
    private StpInterfaceImpl stpInterfaceImplUnderTest;

    @Test
    public void testGetPermissionList() {
        assertNull(stpInterfaceImplUnderTest.getPermissionList("o", "s"));
    }

//    @Test
//    public void testGetRoleList() {
//        // Setup
//        when(mockUserRoleMapper.getRoleById("loginId")).thenReturn("result");
//
//        // Run the test
//        final List<String> result = stpInterfaceImplUnderTest.getRoleList("loginId", "s");
//
//        // Verify the results
//        assertEquals(List.of("value"), result);
//    }
}
