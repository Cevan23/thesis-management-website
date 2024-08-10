import { useState } from 'react';
import './Search.scss';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSearch = () => {
      if (onSearch) {
        onSearch(query);
      }
    };
  
    return (
      <div className="flex items-center space-x-2 size">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    );
  };
  
  export default SearchComponent;