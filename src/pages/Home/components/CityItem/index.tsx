import React, { useMemo, useRef } from "react";
import { LocationData } from "../../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
	setLocations,
	setLocation,
	toggleFavouriteCities,
} from "../../../../redux/features/city";
import { twMerge } from "tailwind-merge";

interface CityItemProps {
	item: LocationData;
}

export default function CityItem({ item }: CityItemProps) {
	const { locations, location, favouriteCities } = useAppSelector(
		(state) => state.city,
	);
	const closeRef = useRef<HTMLSpanElement | null>(null);
	const favouriteRef = useRef<HTMLSpanElement | null>(null);
	const dispatch = useAppDispatch();

	const removeFromList = (id: number) => {
		return () => {
			if (id === location?.id) dispatch(setLocation(undefined));
			const filterdLocations = [...locations].filter((item) => item.id !== id);
			dispatch(setLocations(filterdLocations));
		};
	};

	const setWeatherLocation = (e: any) => {
		const target = e.target;
		if (closeRef.current && closeRef.current.contains(target)) return;
		if (favouriteRef.current && favouriteRef.current.contains(target)) return;
		dispatch(setLocation(item));
	};

	const isActive = useMemo(() => {
		return location?.id === item.id;
	}, [item.id, location?.id]);

	const addOrRemoveFavorite = () => dispatch(toggleFavouriteCities(item));

	const isFavourited = useMemo(() => {
		return !!favouriteCities?.find((city) => city?.id === item?.id);
	}, [favouriteCities, item]);
	return (
		<li
			className={twMerge(
				"flex p-3 card-shadow rounded-xl my-3 shrink-0 bg-[#e0e0e04d] hover:bg-[#db453720] cursor-pointer",
				isActive ? "bg-[#db453738]" : "",
			)}
			onClick={setWeatherLocation}
		>
			<div className="h-full flex-col flex justify-between">
				<span className="flex h-[24px] w-[24px] rounded-full bg-[#db4537] items-center justify-center shrink-0">
					<i className="material-icons text-white text-[14px]">location_city</i>
				</span>
				<span
					className="material-icons text-[orange] mt-3"
					onClick={addOrRemoveFavorite}
					ref={favouriteRef}
				>
					{!isFavourited ? "star_outline" : "star"}
				</span>
			</div>
			<div className="ml-5 w-full relative">
				<div className="items-center flex justify-between">
					<span className="truncate block max-w-[180px] items-center">
						{item.name}{" "}
						<span className="text-xs text-[#868686]">{item.country}</span>
					</span>
					<span
						className="material-icons text-[#868686] translate-x-2 translate-y-[-6px]"
						onClick={removeFromList(item.id)}
						ref={closeRef}
					>
						close
					</span>
				</div>
				<div className="flex justify-between items-center w-full">
					<div className="flex items-center">
						<span className="material-icons text-sm text-[#868686]">
							groups
						</span>
						<span className="text-xs text-[#868686] ml-2">
							{item?.population?.toLocaleString() || "unknown"}
						</span>
					</div>
					<div className="flex items-center">
						<span className="material-icons text-sm text-[#868686]">
							schedule
						</span>
						<span className="text-xs text-[#868686] ml-1 truncate w-[80px]">
							{item.timezone}
						</span>
					</div>
				</div>

				{item.isMyLocation && (
					<>
						<hr />
						<div className="flex items-center justify-end pt-1">
							<span className="material-icons text-[12px]">location_on</span>
							<div className="text-[8px] text-[#868686]"> My Location</div>
						</div>
					</>
				)}
			</div>
		</li>
	);
}
