import React, { useState } from 'react';

function SearchBar({ onSearch, onAddStudent }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const items = await onSearch(query);
        setResults(items);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a student"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((user) => (
                    <li key={user.id}>
                        {user.login}
                        <button onClick={() => onAddStudent(user.login)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
