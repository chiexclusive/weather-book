import { useEffect } from "react";
import { Button, LocationSearch } from "../../../../components";
import { setLocations } from "../../../../redux/features/city";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { mergeLists } from "../../../../utils/helper";
import { LocationData } from "../../../../utils/types";
import CityItem from "../CityItem";

export default function SearchPanel() {
	const dispatch = useAppDispatch();
	const { locations, location } = useAppSelector((state) => state.city);

	const handleChange = (arg: LocationData) => {
		dispatch(setLocations(mergeLists([arg], locations, "id")));
	};

	const clearAll = () => dispatch(setLocations([]));

	useEffect(() => {
		if (!location?.isMyLocation) return;
		dispatch(setLocations(mergeLists([location], locations, "id")));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, location]);
	return (
		<aside className="h-full shadow-lg w-[300px] p-3 flex flex-col">
			<LocationSearch onChange={handleChange} />
			<ul className="mt-5 overflow-y-auto flex-1 scrollbar">
				{locations.length > 0 && (
					<Button className="p-2 py-1 rounded-lg" onClick={clearAll}>
						Clear All
					</Button>
				)}
				{locations.map((item) => (
					<CityItem key={item.id} item={item} />
				))}
			</ul>
		</aside>
	);
}
