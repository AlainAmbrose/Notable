import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      className="bg-white p-2 w-[50vw] mr-5 rounded-md shadow-md focus:outline-none flex-initial"
      placeholder="Search notes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
