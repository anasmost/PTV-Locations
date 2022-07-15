import React from "react";
import { useDispatch } from "react-redux";
import "./App.scss";

import Locations from "./features/locations/Locations";
import {
  fetchLocationsAsync,
  setSearchTerm,
} from "./features/locations/locationsSlice";
import SearchForm from "./features/search-form/Form";

function App() {
  const dispatch = useDispatch();

  const onSearchFormSubmit = (searchTerm) => {
    dispatch(fetchLocationsAsync(searchTerm));
  };
  const onInputChange = (searchTerm) => dispatch(setSearchTerm(searchTerm));

  return (
    <main className="App">
      <h1>Cherchez des emplacements avec l'API PTV</h1>
      <SearchForm
        onInputChange={onInputChange}
        onSearchFormSubmit={onSearchFormSubmit}
      />
      <Locations />
    </main>
  );
}

export default App;
