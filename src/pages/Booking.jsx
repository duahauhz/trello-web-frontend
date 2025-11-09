import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import BookingHero from '../components/booking/BookingHero';
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
      
      {/* Hero Section */}
      <BookingHero />
      
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Appointment Schedule Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AppointmentSchedule />
        </Box>
        
        {/* Medical Specialties Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <MedicalSpecialties />
        </Box>
        
        {/* Top Rated Doctors Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <TopRatedDoctors />
        </Box>
        
        {/* Patient Testimonials Section */}
        <Box>
          <PatientTestimonials />
        </Box>
      </Container>
    </Box>
  );
}
