import { createSlice } from "@reduxjs/toolkit";
import { LatLng } from "leaflet";
import { LocationData } from "../../utils/types";
import { cities } from "../../data/cities";

export interface CityState {
	currentLocation: LatLng | undefined;
	locations: LocationData[];
	location: LocationData | undefined;
	favouriteCities: LocationData[];
}

const initialState: CityState = {
	currentLocation: undefined,
	locations: cities,
	location: undefined,
	favouriteCities: [],
};

export const citySlice = createSlice({
	name: "city",
	initialState,
	reducers: {
		setCurrentLocation(state, { payload }) {
			state.currentLocation = payload;
		},
		setLocations(state, { payload }) {
			state.locations = payload;
		},
		setLocation(state, { payload }) {
			state.location = payload;
		},
		toggleFavouriteCities(state, { payload }) {
			let favourites = [...state.favouriteCities];
			const index = favourites.findIndex((item) => item.id === payload.id);
			if (index < 0) {
				favourites.push(payload);
			} else {
				favourites = favourites.filter(
					(item, currentIndex) => currentIndex !== index,
				);
			}

			state.favouriteCities = favourites;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setCurrentLocation,
	setLocations,
	setLocation,
	toggleFavouriteCities,
} = citySlice.actions;

export default citySlice.reducer;
