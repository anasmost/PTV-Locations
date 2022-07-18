import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectLocations } from "./locationsSlice";
import "./Locations.scss";

const isArabic = (sentence) => /[\u0600-\u06FF]/.test(sentence);

function Locations() {
  const locations = useSelector(selectLocations);

  const mapContainerRef = useRef(null);

  return (
    <section className="locations">
      <figure className="search-results">
        <figcaption>Résultats de recherche</figcaption>
        <menu>
          {locations.map(({ address, key }) => (
            <li className={isArabic(address) ? "arabic" : ""} key={key}>
              {address}
            </li>
          ))}
        </menu>
      </figure>
      <div className="map-container" ref={mapContainerRef}></div>
    </section>
  );
}

export default Locations;
