import { createSlice } from "@reduxjs/toolkit";
import { WeatherData } from "../../utils/types";
export interface WeatherState {
	weather: WeatherData | undefined;
}

const initialState: WeatherState = {
	weather: undefined,
};

export const weatherSlice = createSlice({
	name: "city",
	initialState,
	reducers: {
		setWeather(state, { payload }) {
			state.weather = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
