import React from "react";
import { useSelector } from "react-redux";
import { selectLocations } from "./locationsSlice";
import "./Locations.scss";

export function Locations() {
  const locations = useSelector(selectLocations);

  return (
    <figure id="locations">
      <menu>
        {locations.map((location) => (
          <li key={location}>{location}</li>
        ))}
      </menu>
      <div className="map"></div>
    </figure>
  );
}
