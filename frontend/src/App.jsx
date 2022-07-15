import React from "react";
import "./App.scss";

import { Locations } from "./features/locations/Locations";

function App() {
  return (
    <main className="App">
      <h1>Cherchez des emplacements avec l'API PTV</h1>
      <form id="search">
        <input
          type="text"
          placeholder="Cherchez un emplacement"
          autoComplete="address-level1"
        />
        <button type="submit">Confirmer</button>
      </form>
      <Locations />
    </main>
  );
}

export default App;
