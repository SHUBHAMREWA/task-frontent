const API_URL = 'https://task-backend-qypu.onrender.com/api';



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
    credentials: 'include', // Send cookies if available
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

export const forgotPassword = async (email) => {
  return apiCall('/user/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token, password) => {
  return apiCall(`/user/reset-password/${token}`, {
    method: 'PUT',
    body: JSON.stringify({ password }),
  });
};

export const changePassword = async (passwords) => {
  return apiCall('/user/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwords),
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
