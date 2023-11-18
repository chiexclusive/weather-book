import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { LocationData } from "../../../../utils/types";
import {
	setLocation,
	toggleFavouriteCities,
} from "../../../../redux/features/city";

export default function Favourites() {
	const dispatch = useAppDispatch();
	const location = useAppSelector((state) => state.city.location);
	const favourites = useAppSelector((state) => state.city.favouriteCities);
	const closeRef = useRef<HTMLSpanElement | null>(null);
	const removeFavorite = (item: LocationData) => () => {
		if (item?.id === location?.id) dispatch(setLocation(undefined));
		dispatch(toggleFavouriteCities(item));
	};

	const setWeatherLocation = (item: LocationData) => (e: any) => {
		const target = e.target;
		if (closeRef.current && closeRef.current.contains(target)) return;
		dispatch(setLocation(item));
	};
	return (
		<div className="flex flex-wrap">
			{favourites.map((item) => (
				<span
					className="cursor-pointer flex items-center px-3 py-2 m-2 rounded-3xl bg-[#db4537] text-sm text-white"
					onClick={setWeatherLocation(item)}
				>
					<span className="material-icons text-sm mr-2">star</span>
					<span>{item?.name}</span>
					<span
						className="material-icons text-sm ml-2 cursor-pointer"
						onClick={removeFavorite(item)}
						ref={closeRef}
					>
						close
					</span>
				</span>
			))}
		</div>
	);
}
