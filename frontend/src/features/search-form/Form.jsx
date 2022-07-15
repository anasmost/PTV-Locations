import React from "react";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../locations/locationsSlice";
import "./Form.scss";

function SearchForm({ onInputChange, onSearchFormSubmit }) {
  const searchTerm = useSelector(selectSearchTerm);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearchFormSubmit) {
      onSearchFormSubmit(searchTerm);
    }
  };

  return (
    <form id="search" onSubmit={onSubmit}>
      <input
        placeholder="Cherchez un emplacement"
        autoComplete="address-level1"
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button type="submit">Confirmer</button>
    </form>
  );
}

export default SearchForm;
