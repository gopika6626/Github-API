import React from 'react';

function StudentDetails({ student }) {
    return (
        <div>
            <h2>{student.user.name} ({student.user.login})</h2>
            <p>Repositories: {student.repos.length}</p>
            <ul>
                {student.repos.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default StudentDetails;
