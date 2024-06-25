import React from 'react';
import '../../css/Searchbar.css';

// Update the Props interface to include placeholder
interface Props {
    onSearch: (searchTerm: string) => void;
    placeholder?: string; // '?' marks it as an optional prop
}

// Destructure the placeholder from props and use it in the input element
const SearchBar: React.FC<Props> = ({ onSearch, placeholder = "Search..." }) => {
    return (
        <input
            type="text"
            placeholder={placeholder} // Use the placeholder prop here
            onChange={(e) => onSearch(e.target.value)}
            className="search-bar"
        />
    );
};

export default SearchBar;
