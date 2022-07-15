// A mock function to mimic making an async request for data
export function fetchLocations(locationName = "Meknès") {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: ["Marjane 1", "Marjane 2", "Marjane 3"] }),
      500
    )
  );
}
