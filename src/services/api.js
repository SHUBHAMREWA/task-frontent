const API_URL = 'http://localhost:4000/api';


// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  console.log("response from api call ", data)

  return data;
};

// Auth APIs
export const login = async (credentials) => {
  return apiCall('/user/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};


export const signup = async (userData) => {
  return apiCall('/user/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};


// Student APIs
export const getAllStudents = async () => {
  return apiCall('/students');
};

export const getStudentProfile = async () => {
  return apiCall('/students/profile');
};

export const createStudent = async (studentData) => {
  return apiCall('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
};

export const updateStudent = async (id, studentData) => {
  return apiCall(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  });
};

export const updateStudentProfile = async (studentData) => {
  return apiCall('/students/profile', {
    method: 'PUT',
    body: JSON.stringify(studentData),
  });
};

export const deleteStudent = async (id) => {
  return apiCall(`/students/${id}`, {
    method: 'DELETE',
  });
};
