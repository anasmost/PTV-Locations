import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationsAsync,
  selectSearchTerm,
  setSearchTerm,
} from "../locations/locationsSlice";
import "./SearchForm.scss";

export const ErrorMessage = ({
  item,
  validators = {
    "": Boolean,
    "Entrez une valeur !": (item) => !item,
  },
  ...otherProps
}) => {
  for (const message in validators) {
    if (
      Object.hasOwnProperty.call(validators, message) &&
      validators[message](item)
    ) {
      return message && <span {...otherProps}>{message}</span>;
    }
  }
};

const validators = {
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
          <ErrorMessage
            className="error"
            item={searchTerm}
            validators={validators}
          />
        )}
      </label>
      <button type="submit">Confirmer</button>
    </form>
  );
}

export default SearchForm;
