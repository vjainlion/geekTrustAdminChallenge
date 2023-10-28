import React from "react";

const SearchBar = (props) => {
  const { onSearchTextChange, handleSearch } = props;
  return (
    <div class="input-group mb-3">
      <input
        onChange={(e) => {
          const valueToSearch = e.target.value;
          onSearchTextChange(valueToSearch);
          handleSearch(valueToSearch);
        }}
        type="text"
        class="form-control"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
