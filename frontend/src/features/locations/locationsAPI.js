import axios from "axios";

export async function fetchLocations(searchTerm) {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/?search=${encodeURIComponent(searchTerm)}`
    );

    const { results: locations } = data;

    return locations.map(
      ({ location: { referenceCoordinate, formattedAddress } }) => ({
        key: `${formattedAddress}/${JSON.stringify(referenceCoordinate)}`,
        address: formattedAddress,
        coordinates: referenceCoordinate,
      })
    );
  } catch (err) {
    throw new Error(err);
  }
}
