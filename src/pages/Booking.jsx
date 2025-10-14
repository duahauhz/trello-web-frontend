import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import AppointmentSchedule from '../components/booking/AppointmentSchedule';
import MedicalSpecialties from '../components/booking/MedicalSpecialties';
import TopRatedDoctors from '../components/booking/TopRatedDoctors';
import PatientTestimonials from '../components/booking/PatientTestimonials';

export default function Booking() {
  // Backend integration points:
  // 1. Fetch user's appointments: const appointments = await fetch('/api/appointments');
  // 2. Fetch specialties with doctor counts: const specialties = await fetch('/api/specialties');
  // 3. Fetch top rated doctors: const doctors = await fetch('/api/doctors/top-rated');
  // 4. Fetch patient reviews: const reviews = await fetch('/api/reviews/latest');
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Appointment Schedule Section */}
        <Box sx={{ mb: 6 }}>
          <AppointmentSchedule />
        </Box>
        
        {/* Medical Specialties Section */}
        <Box sx={{ mb: 6 }}>
          <MedicalSpecialties />
        </Box>
        
        {/* Top Rated Doctors Section */}
        <Box sx={{ mb: 6 }}>
          <TopRatedDoctors />
        </Box>
        
        {/* Patient Testimonials Section */}
        <Box sx={{ mb: 4 }}>
          <PatientTestimonials />
        </Box>
      </Container>
    </Box>
  );
}
