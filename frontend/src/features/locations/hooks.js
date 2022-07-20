import { useEffect, useRef, useState } from "react";

export function useLeaflet(mapContainerRef, locations) {
  const [currentLocation, setCurrentLocation] = useState({
    key: null,
    latlng: null,
    address: null,
  });
  // 'L' prefix denotes Leaflet - Keep only one instance of each of either the map or the marker
  const LmapRef = useRef(null);
  const LmarkersRef = useRef([]);
  const LmaxZoom = 2;
  const LminOpacity = 0.6,
    LmaxOpacity = 1;

  // Initialize the map
  useEffect(() => {
    const L = window.L;
    const mapContainer = mapContainerRef.current;

    const map = (LmapRef.current = L.map(mapContainer)
      .locate()
      .on("locationfound", function ({ latlng }) {
        setCurrentLocation({ latlng, address: null });
      })
      .on("locationerror", function () {
        this.fitWorld({ LmaxZoom });
      }));

    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    return () => {
      tileLayer.remove();
      map.remove();
    };
  }, [mapContainerRef]);

  // Initialize & Update locations markers upon new locations search results
  useEffect(() => {
    const L = window.L;
    const map = LmapRef.current;

    const markers = (LmarkersRef.current = locations.map(
      ({ latlng, address }) =>
        L.marker(latlng, { opacity: LminOpacity }).bindPopup(address).addTo(map)
    ));

    if (locations.length) setCurrentLocation(locations[0]);

    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [locations]);

  // Point out the marker of the current position
  useEffect(() => {
    const L = window.L;
    const map = LmapRef.current;
    const markers = LmarkersRef.current;

    const { latlng, address } = currentLocation;

    if (latlng) {
      let currentMarker = markers.find((marker) =>
        marker.getLatLng().equals(latlng)
      );

      const markerExists = !!currentMarker;

      currentMarker ??= L.marker(latlng, LmaxZoom)
        .bindPopup(address)
        .addTo(map);
      currentMarker.setOpacity(LmaxOpacity);
      map.setView(latlng, LmaxZoom);

      return markerExists
        ? () => currentMarker.setOpacity(LminOpacity)
        : () => currentMarker.remove();
    }
  }, [currentLocation]);

  return [currentLocation, setCurrentLocation];
}
