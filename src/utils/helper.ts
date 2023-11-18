import { Current } from "./types";
import { WeatherFocast } from "./enums";

export const mergeLists = <T>(
	baseList: T[],
	newList: T[],
	selector: string,
): T[] => {
	const idMap: { [id: string]: boolean } = {};
	const base: T[] = [...baseList];

	// Mark all IDs from the base list as "seen"
	base.forEach((item: T) => {
		idMap[item[selector as keyof T] as string] = true;
	});

	// Append items from the new list to the base list, replacing duplicates based on ID
	newList.forEach((newItem: T) => {
		if (idMap[newItem[selector as keyof T] as string]) {
			// Replace existing item in the base list
			const index = base.findIndex(
				(item) => item[selector as keyof T] === newItem[selector as keyof T],
			);
			if (index !== -1) {
				base[index] = newItem;
			}
		} else {
			// Append new item to the base list
			base.push(newItem);
			idMap[newItem[selector as keyof T] as string] = true; // Mark this ID as "seen"
		}
	});

	return base;
};

export function determineWeather(weatherData: Current) {
	if (weatherData.weather_code === 1) {
		return WeatherFocast.SUNNY;
	} else if (
		weatherData.weather_code === 3 &&
		weatherData.wind_speed_10m >= 15
	) {
		return WeatherFocast.MODERATE_WINDY;
	} else if (weatherData.precipitation > 0) {
		if (weatherData.rain > 0) {
			if (weatherData.rain < 5) {
				return WeatherFocast.LIGHT_RAIN;
			} else if (weatherData.rain < 15) {
				return WeatherFocast.MODERATE_RAIN;
			} else {
				return WeatherFocast.HEAVY_RAIN;
			}
		} else if (weatherData.snowfall > 0) {
			return WeatherFocast.SNOWING;
		} else {
			return WeatherFocast.UNKNOWN;
		}
	} else if (weatherData.cloud_cover >= 70) {
		return WeatherFocast.CLOUDY;
	} else {
		return WeatherFocast.UNKNOWN;
	}
}

export async function copyToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
