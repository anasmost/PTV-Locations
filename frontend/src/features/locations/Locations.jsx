import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectLocations } from "./locationsSlice";
import "./Locations.scss";
import { useLeaflet } from "./hooks";

const isArabic = (sentence) => /[\u0600-\u06FF]/.test(sentence);

function Locations() {
  const locations = useSelector(selectLocations);

  const mapContainerRef = useRef(null);

  const [currentLocation, setCurrentLocation] = useLeaflet(
    mapContainerRef,
    locations
  );

  return (
    <section className="locations">
      <figure className="search-results">
        <figcaption>Résultats de recherche</figcaption>
        <menu>
          {locations.map((location) => (
            <li
              className={`${isArabic(location.address) ? "arabic" : ""} ${
                currentLocation.key === location.key ? "selected" : ""
              }`}
              key={location.key}
              onClick={() => {
                setCurrentLocation(location);
              }}
            >
              {location.address}
            </li>
          ))}
        </menu>
      </figure>
      <div className="map-container" ref={mapContainerRef}></div>
    </section>
  );
}

export default Locations;
