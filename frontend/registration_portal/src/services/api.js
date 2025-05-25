// src/api/index.js

import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/users', // ✅ Port 5000 = your Express backend
});

// POST request to register user
export const registerUser = (data) => API.post('/register', data);
