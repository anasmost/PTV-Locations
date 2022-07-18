import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLocations } from "./locationsAPI";

const initialState = {
  searchTerm: "",
  locations: [],
  status: "idle",
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearLocations: (state) => {
      state.locations = [];
      state.searchTerm = "";
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLocationsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.locations = action.payload;
      });
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchLocationsAsync(searchTerm))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchLocationsAsync = createAsyncThunk(
  "locations/fetchLocations",
  async (searchTerm) => {
    const locations = await fetchLocations(searchTerm);
    // The locations we return becomes the `fulfilled` action payload
    return locations;
  }
);

// Action creators
export const { clearLocations, setLocations, setSearchTerm } =
  locationsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLocations = (state) => state.locations.locations;
export const selectSearchTerm = (state) => state.locations.searchTerm;

export default locationsSlice.reducer;
