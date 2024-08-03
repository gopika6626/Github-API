import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchUsers = (query) => api.get(`/search?query=${query}`);
export const addStudent = (username) => api.post('/add-student', { username });
export const getStudents = () => api.get('/students');
export const getStudentDetails = (username) => api.get(`/student/${username}`);
