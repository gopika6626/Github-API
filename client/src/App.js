import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('/students');
            setStudents(response.data.students);
        };
        fetchStudents();
    }, []);

    const handleSearch = async (query) => {
        const response = await axios.get(`/search?query=${query}`);
        return response.data.items;
    };

    const handleAddStudent = async (username) => {
        const response = await axios.post('/add-student', { username });
        setStudents(response.data.students);
    };

    const handleSelectStudent = async (username) => {
        const response = await axios.get(`/student/${username}`);
        setSelectedStudent(response.data);
    };

    return (
        <div className="App">
            <div className="sidebar">
                <SearchBar onSearch={handleSearch} onAddStudent={handleAddStudent} />
                <StudentList students={students} onSelectStudent={handleSelectStudent} />
            </div>
            <div className="main">
                {selectedStudent && <StudentDetails student={selectedStudent} />}
            </div>
        </div>
    );
}

export default App;
