import React, { useState } from 'react';
import PropTypes from 'prop-types';


function SearchBar({ onSearch, onAddStudent }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const items = await onSearch(query);
            setResults(items);
        } catch (error) {
            console.error('Error searching for users:', error);
            // Optionally, you could set some error state here to show a message to the user.
        }
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
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onAddStudent: PropTypes.func.isRequired,
};
export default SearchBar;
