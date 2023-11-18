import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
	reducerPath: "locationApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_OPENSTREET_BASE_URL,
	}),
	endpoints: (builder) => ({
		getLocationData: builder.query<any, { lat: number; lng: number }>({
			query: ({ lat, lng }) => {
				return `/reverse?format=json&lat=${lat}&lon=${lng}`;
			},
		}),
	}),
});

export const { useLazyGetLocationDataQuery } = locationApi;
