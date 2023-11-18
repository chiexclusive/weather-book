import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocationData } from "../../utils/types";

export const cityApi = createApi({
	reducerPath: "cityApi",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CITY_BASE_URL }),
	endpoints: (builder) => ({
		getCities: builder.query<{ results: LocationData[] }, string>({
			query: (query) =>
				`search?apikey=&name=${query}&count=8&language=en&format=json`,
		}),
	}),
});

export const { useGetCitiesQuery } = cityApi;
