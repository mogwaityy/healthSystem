import React, { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState({
        upcoming: [],
        past: [] // Initialize your appointment lists
    });

    const addAppointment = (newAppointment) => {
        setAppointments(prev => ({
            ...prev,
            upcoming: [...prev.upcoming, newAppointment]
        }));
    };

    return (
        <AppointmentContext.Provider value={{ appointments, addAppointment }}>
            {children}
        </AppointmentContext.Provider>
    );
};
