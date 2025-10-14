// API Service for Appointment Management
// This file contains all API calls related to appointments
// Replace BASE_URL with your actual backend URL

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Get all appointments for the current user
 * @returns {Promise<Array>} List of appointments
 */
export const getAppointments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

/**
 * Get a single appointment by ID
 * @param {number} id - Appointment ID
 * @returns {Promise<Object>} Appointment details
 */
export const getAppointmentById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment information
 * @returns {Promise<Object>} Created appointment
 */
export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

/**
 * Update an existing appointment
 * @param {number} id - Appointment ID
 * @param {Object} appointmentData - Updated appointment information
 * @returns {Promise<Object>} Updated appointment
 */
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      throw new Error('Failed to update appointment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

/**
 * Cancel an appointment
 * @param {number} id - Appointment ID
 * @returns {Promise<Object>} Response message
 */
export const cancelAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to cancel appointment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    throw error;
  }
};

/**
 * Delete an appointment permanently
 * @param {number} id - Appointment ID
 * @returns {Promise<void>}
 */
export const deleteAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }

    return;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

/**
 * Get available time slots for a doctor on a specific date
 * @param {number} doctorId - Doctor ID
 * @param {string} date - Date in format YYYY-MM-DD
 * @returns {Promise<Array>} List of available time slots
 */
export const getAvailableSlots = async (doctorId, date) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/available-slots?doctorId=${doctorId}&date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};
