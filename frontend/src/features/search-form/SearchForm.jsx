import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationsAsync,
  selectSearchTerm,
  setSearchTerm,
} from "../locations/locationsSlice";
import "./SearchForm.scss";

export const SearchErrorMessage = ({
  searchTerm,
  validationObject = {
    "": Boolean,
    "Entrez une valeur !": (searchTerm) => searchTerm === "",
  },
  ...otherProps
}) => {
  for (const message in validationObject) {
    if (
      Object.hasOwnProperty.call(validationObject, message) &&
      validationObject[message](searchTerm)
    ) {
      return message && <span {...otherProps}>{message}</span>;
    }
  }
};

const validationObject = {
  "": Boolean,
  "Entrez un emplacement !": (searchTerm) => !searchTerm,
};

function SearchForm() {
  const [validateEntry, setValidateEntry] = useState(false);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setValidateEntry(true);
    if (searchTerm) {
      dispatch(fetchLocationsAsync(searchTerm));
    }
  };

  const onChange = (e) => {
    setValidateEntry(false);
    const inputValue = e.target.value.trim();
    dispatch(setSearchTerm(inputValue));
  };

  return (
    <form className="search" onSubmit={onSubmit}>
      <label>
        <input
          placeholder="Cherchez un emplacement"
          autoComplete="address-level1"
          autoFocus={true}
          value={searchTerm}
          onChange={onChange}
        />
        {validateEntry && (
          <SearchErrorMessage
            className="error"
            searchTerm={searchTerm}
            validationObject={validationObject}
          />
        )}
      </label>
      <button type="submit">Confirmer</button>
    </form>
  );
}

export default SearchForm;
