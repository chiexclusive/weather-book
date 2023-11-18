import {
	ChangeEvent,
	EventHandler,
	HTMLAttributes,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useClickoutEffect } from "../../hooks";
import { twMerge } from "tailwind-merge";
import Loader from "../Loader";
import { debounce } from "lodash";
import { LocationData } from "../../utils/types";
import { useGetCitiesQuery } from "../../redux/services/city.service";

interface LocationSearchProps
	extends Omit<Partial<HTMLAttributes<HTMLInputElement>>, "onChange"> {
	onChange: (arg: LocationData) => void;
}
interface LocationItemProps {
	item: LocationData;
	onChange: (arg: LocationData) => void;
}

const LocationItem = ({ item, onChange }: LocationItemProps) => {
	return (
		<li
			className="p-3 flex items-center cursor-pointer hover:bg-[#70757923]"
			onClick={() => onChange(item)}
		>
			<i className="material-icons text-[#707579]">location_city</i>
			<span className="text-sm block ml-5">
				{item.name}{" "}
				<span className="text-xs text-[#707579]">{item.country}</span>
			</span>
		</li>
	);
};

export default function LocationSearch({
	onChange,
	...props
}: LocationSearchProps) {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLElement | null>(null);
	const [query, setQuery] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const { data, isFetching } = useGetCitiesQuery(search);

	const updateSearchParam = useMemo(
		() =>
			debounce((query) => {
				setSearch(query);
			}, 500),
		[],
	);

	useEffect(() => {
		updateSearchParam(query);
	}, [query, updateSearchParam]);

	const dismiss = () => {
		setOpen(false);
	};

	const toggle = () => setOpen(true);

	useClickoutEffect(ref, dismiss, open);

	const handleChange: EventHandler<ChangeEvent<HTMLInputElement>> = (e) =>
		setQuery(e.target.value);

	const locations = useMemo(() => {
		if (isFetching) return [];
		return data?.results || [];
	}, [data, isFetching]);

	const handleItemChange = (arg: LocationData) => {
		onChange(arg);
		dismiss();
	};

	return (
		<div className="h-[48px] w-full relative " ref={ref as any}>
			<div className="z-[10] rounded-xl card-shadow bg-[#e0e0e0] absolute top-0 w-full h-fit overflow-hidden">
				<div className="h-[48px] flex items-center p-3">
					<input
						className="w-full h-full text-sm bg-transparent outline-none border-0 placeholder:text-[#707579]"
						placeholder="Search location"
						onChange={handleChange}
						value={query}
						onInput={toggle}
						onFocus={toggle}
						{...props}
					/>
					<i className="material-icons">search</i>
				</div>

				<div
					className={twMerge(
						"w-full shadow-sm overflow-hidden ease-in transition-all",
						open ? "max-h-[1000px]" : "max-h-[0px]",
					)}
				>
					<hr />

					<div>
						<ul>
							{locations.map((item) => (
								<LocationItem
									item={item}
									key={item.id}
									onChange={handleItemChange}
								/>
							))}
						</ul>
						<div className="flex justify-center items-center">
							<Loader color={"black"} loading={isFetching} />
						</div>
						{!isFetching && !locations.length && (
							<div className="flex justify-center items-center p-3">
								<span className="text-sm text-[#707579]">No city found</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
