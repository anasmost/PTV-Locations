import { useEffect, useRef, useState } from "react";

export function useLeaflet(mapContainerRef) {
  const [location, setLocation] = useState({
    key: null,
    latlng: null,
    address: null,
  });
  // 'L' prefix denotes Leaflet - Keep only one instance of each of either the map or the marker
  const LMapRef = useRef(null);
  const LMarkerRef = useRef(null);

  // Initialize the map and the marker
  useEffect(() => {
    const L = window.L;
    const mapContainer = mapContainerRef.current;
    const maxZoom = 5;

    const marker = (LMarkerRef.current = L.marker(null, maxZoom).bindPopup(
      null
    ));

    const map = (LMapRef.current = L.map(mapContainer)
      .locate()
      .on("locationfound", function ({ latlng }) {
        setLocation({ latlng, address: null });
      })
      .on("locationerror", function () {
        this.fitWorld({ maxZoom: 5 });
      }));

    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    return () => {
      marker.remove();
      tileLayer.remove();
      map.remove();
    };
  }, [mapContainerRef]);

  // Updates marker position and popup text upon location state update
  useEffect(() => {
    const { latlng, address } = location;
    const maxZoom = 5;

    if (latlng) {
      const map = LMapRef.current;
      const marker = LMarkerRef.current;

      map.setView(latlng, maxZoom);
      marker.setLatLng(latlng).setPopupContent(address);

      if (!map.hasLayer(marker)) {
        marker.addTo(map);
      }
    }
  }, [location]);

  return [location, setLocation];
}
