import React from "react";
import "./App.scss";

import Locations from "../features/locations/Locations";
import SearchForm from "../features/search-form/SearchForm";

function App() {
  return (
    <main className="App">
      <h1>Cherchez des emplacements avec l'API PTV</h1>
      <SearchForm />
      <Locations />
    </main>
  );
}

export default App;
