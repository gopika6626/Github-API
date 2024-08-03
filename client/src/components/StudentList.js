import React from 'react';

function StudentList({ students, onSelectStudent }) {
    return (
        <div>
            <h3>Students</h3>
            <ul>
                {students.map((student) => (
                    <li key={student}>
                        {student}
                        <button onClick={() => onSelectStudent(student)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
