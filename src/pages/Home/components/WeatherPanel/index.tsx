import { LatLng } from "leaflet";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Button, Loader } from "../../../../components";
import { useEffect } from "react";
import { useGetWeatherInformationQuery } from "../../../../redux/services/weather.service";
import { setWeather } from "../../../../redux/features/weather";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { pages } from "../../../../utils/constants";
import useCopyEffect from "../../../../hooks/useCopyEffect";

export default function WeatherPanel() {
	const dispatch = useAppDispatch();
	const location = useAppSelector((state) => state.city.location);
	const weather = useAppSelector((state) => state.weather.weather);
	const coords = new LatLng(location?.latitude || 0, location?.longitude || 0);
	const [text, triggerCopy] = useCopyEffect(`${coords.lat}, ${coords.lng}`);
	const { isFetching, data } = useGetWeatherInformationQuery(coords, {
		skip: !location,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isFetching) {
			setWeather(undefined);
			return;
		}
		if (data) dispatch(setWeather(data));
	}, [data, dispatch, isFetching]);

	const gotoDetails = () => {
		navigate(pages.DETAILS);
	};

	return (
		<aside className="h-full shadow-lg w-[300px] p-3 flex flex-col">
			{!location && !isFetching && (
				<div className="justify-center items-center p-3 flex flex-col">
					<span className="material-icons text-[#707579]">dashboard</span>
					<span className="text-sm text-[#707579]">No city selected</span>
				</div>
			)}
			{isFetching && (
				<div className="flex justify-center mt-8 flex-col w-full items-center">
					<Loader color="black" />
					<span className="text-sm text-[#707579]">Loading...</span>
				</div>
			)}
			{location && !isFetching && (
				<div className="flex-1 ">
					<header className="leading-[12px]">
						<div>
							<h1 className="font-semibold text-3xl">
								{capitalize(location?.name)}{" "}
								<span className="text-lg text-[#868686]">
									({location.country})
								</span>
							</h1>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<span className="material-icons text-sm text-[#868686]">
										groups
									</span>
									<span className="text-xs text-[#868686] ml-2">
										{location?.population?.toLocaleString() || "unknown"}
									</span>
								</div>
								<div className="flex items-center">
									<span className="material-icons text-sm text-[#868686]">
										schedule
									</span>
									<span className="text-[12px] text-[#868686] ml-1">
										{dayjs(weather?.current.time).format("MMM DD, YYYY")}
									</span>
								</div>
							</div>
						</div>
					</header>
					<hr />
					<section className="overflow-y-auto scrollbar flex-1">
						<b className="mt-8 block">Geographic Data</b>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Elevation</span>
							<span className="text-sm">{location.elevation}</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Feature Code</span>
							<span className="text-sm">{location.feature_code}</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Country Code</span>
							<span className="text-sm">{location.country_code}</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Time Zone</span>
							<span className="text-sm">{location.timezone}</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Other Name 1</span>
							<span className="text-sm">{location.admin1}</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Other Name 2</span>
							<span className="text-sm">{location.admin2}</span>
						</li>
						<hr />
						<div className="py-3">
							<div className="grid grid-cols-2 gap-[16px]">
								<div className="mb-3 bg-[#86868639] p-3 w-full">
									{location.latitude.toFixed(3)}
									<span className="text-[#868686] translate-y-[5px] inline-block ml-3 text-xs">
										Lat
									</span>
								</div>
								<div className="mb-3 bg-[#86868639] p-3 w-full">
									{location.longitude.toFixed(3)}
									<span className="text-[#868686] translate-y-[5px] inline-block ml-3 text-xs">
										Lng
									</span>
								</div>
							</div>
							<Button
								className="w-full h-[38px] mt-3"
								onClick={triggerCopy as any}
							>
								{text as string}
							</Button>
						</div>
						<hr />
						<b className="mt-8 block">Weather Data</b>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Temperature</span>
							<span className="text-sm">
								{weather?.current.temperature_2m}
								{weather?.current_units.temperature_2m}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">
								Apparent Temperature
							</span>
							<span className="text-sm">
								{weather?.current.apparent_temperature}
								{weather?.current_units.apparent_temperature}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Humidity</span>
							<span className="text-sm">
								{weather?.current.relative_humidity_2m}
								{weather?.current_units.relative_humidity_2m}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Wind Speed</span>
							<span className="text-sm">
								{weather?.current.wind_speed_10m}
								{weather?.current_units.wind_speed_10m}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Wind Direction</span>
							<span className="text-sm">
								{weather?.current.wind_direction_10m}
								{weather?.current_units.wind_direction_10m}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Suface Pressure</span>
							<span className="text-sm">
								{weather?.current.surface_pressure}
								{weather?.current_units.surface_pressure}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Pressure</span>
							<span className="text-sm">
								{weather?.current.pressure_msl}
								{weather?.current_units.pressure_msl}
							</span>
						</li>
						<li className="flex justify-between items-center my-3">
							<span className="text-[#868686] text-xs">Is Day</span>
							<span className="text-sm">
								{!!weather?.current.is_day ? "Yes" : "No"}
							</span>
						</li>
						<Button onClick={gotoDetails}>View More</Button>
					</section>
				</div>
			)}
		</aside>
	);
}
