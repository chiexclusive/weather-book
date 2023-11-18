import { combineReducers } from "@reduxjs/toolkit";
import { cityApi } from "./services/city.service";
import { weatherApi } from "./services/weather.service";
import { citySlice } from "./features/city";
import { weatherSlice } from "./features/weather";
import { noteSlice } from "./features/notes";
import { locationApi } from "./services/location.service";

export const rootReducer = combineReducers({
	city: citySlice.reducer,
	weather: weatherSlice.reducer,
	note: noteSlice.reducer,
	[weatherApi.reducerPath]: weatherApi.reducer,
	[cityApi.reducerPath]: cityApi.reducer,
	[locationApi.reducerPath]: locationApi.reducer,
});
