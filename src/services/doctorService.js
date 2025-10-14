// API Service for Doctor Management
// This file contains all API calls related to doctors

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Get all doctors with optional filters
 * @param {Object} filters - Filter options (specialty, rating, experience, etc.)
 * @returns {Promise<Array>} List of doctors
 */
export const getDoctors = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${BASE_URL}/doctors?${queryParams}` : `${BASE_URL}/doctors`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

/**
 * Get a single doctor by ID
 * @param {number} id - Doctor ID
 * @returns {Promise<Object>} Doctor details
 */
export const getDoctorById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }
};

/**
 * Get top rated doctors
 * @param {number} limit - Number of doctors to fetch
 * @returns {Promise<Array>} List of top rated doctors
 */
export const getTopRatedDoctors = async (limit = 6) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/top-rated?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top rated doctors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top rated doctors:', error);
    throw error;
  }
};

/**
 * Get doctors by specialty
 * @param {string} specialtyId - Specialty ID
 * @returns {Promise<Array>} List of doctors in the specialty
 */
export const getDoctorsBySpecialty = async (specialtyId) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/specialty/${specialtyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctors by specialty');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors by specialty:', error);
    throw error;
  }
};

/**
 * Get doctor reviews
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<Array>} List of reviews
 */
export const getDoctorReviews = async (doctorId) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/${doctorId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctor reviews');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor reviews:', error);
    throw error;
  }
};

/**
 * Get medical specialties
 * @returns {Promise<Array>} List of specialties
 */
export const getSpecialties = async () => {
  try {
    const response = await fetch(`${BASE_URL}/specialties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch specialties');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
};

/**
 * Search doctors by name or specialty
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} List of matching doctors
 */
export const searchDoctors = async (searchTerm) => {
  try {
    const response = await fetch(`${BASE_URL}/doctors/search?q=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search doctors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching doctors:', error);
    throw error;
  }
};
