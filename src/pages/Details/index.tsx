import { useAppSelector } from "../../redux/hooks";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import { BoardItem, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { NoteSection } from "./components";
import TableSection from "./components/TableSection";
import useCopyEffect from "../../hooks/useCopyEffect";

export default function Details() {
	const navigate = useNavigate();
	const weather = useAppSelector((state) => state.weather.weather);
	const location = useAppSelector((state) => state.city.location)!;
	const [text, triggerCopy] = useCopyEffect(
		`${location.latitude}, ${location.longitude}`,
	);

	const goBack = () => navigate(-1);

	return (
		<section className="lg:p-[40px] sm:p-5 p-3">
			<div className="lg:w-[800px] w-full ml-auto mr-auto">
				<div className="mb-8 md:flex items-center justify-between">
					<div className="flex items-center">
						<Button onClick={goBack}>
							<span className="material-icons">arrow_back</span>
							Go Back
						</Button>
						<h1 className="font-semibold text-3xl ml-3">Weather Details</h1>
					</div>
					<div className="flex items-center md:mt-0 mt-5">
						<div className="bg-[#86868639] p-3 w-full flex items-center h-[38px]">
							<span>{location.latitude}</span>
							<span className="text-[#868686]  inline-block ml-3 text-xs">
								Lat
							</span>
						</div>
						<div className="bg-[#86868639] p-3 w-full flex items-center h-[38px]">
							<span>{location.longitude}</span>
							<span className="text-[#868686]  inline-block ml-3 text-xs">
								Lng
							</span>
						</div>
						<Button className="w-full h-[38px]" onClick={triggerCopy as any}>
							{text as string}
						</Button>
					</div>
				</div>
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

				<div className="mt-12">
					<b className="mb-5 block">Geographic Data</b>
					<section className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 lg:gap-[40px] sm:gap-5 gap-3">
						<BoardItem name="Elevation" value={location.elevation} />
						<BoardItem name="Feature Code" value={location.feature_code} />
						<BoardItem name="Country Code" value={location.country_code} />
						<BoardItem name="Time Zone" value={location.timezone} />
						<BoardItem name="Other Name 1" value={location?.admin1 || ""} />
						<BoardItem name="Other Name 2" value={location?.admin2 || ""} />
					</section>
				</div>
				<div className="mt-12">
					<b className="mb-5 block">Weather Data</b>
					<section className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 lg:gap-[40px] sm:gap-5 gap-3">
						<BoardItem
							name="Temperature"
							value={`${weather?.current.temperature_2m}
								${weather?.current_units.temperature_2m}`}
						/>
						<BoardItem
							name="Apparent Temperature"
							value={`${weather?.current.apparent_temperature}
								${weather?.current_units.apparent_temperature}`}
						/>
						<BoardItem
							name="Humidity"
							value={`${weather?.current.relative_humidity_2m}
								${weather?.current_units.relative_humidity_2m}`}
						/>
						<BoardItem
							name="Wind Speed"
							value={`${weather?.current.wind_speed_10m}
								${weather?.current_units.wind_speed_10m}`}
						/>
						<BoardItem
							name="Wind Direction"
							value={`${weather?.current.wind_direction_10m}
								${weather?.current_units.wind_direction_10m}`}
						/>
						<BoardItem
							name="Wind Gusts"
							value={`${weather?.current.wind_gusts_10m}
								${weather?.current_units.wind_gusts_10m}`}
						/>
						<BoardItem
							name="Suface Pressure"
							value={`${weather?.current.surface_pressure}
								${weather?.current_units.surface_pressure}`}
						/>
						<BoardItem
							name="Pressure"
							value={`${weather?.current.pressure_msl}
								${weather?.current_units.pressure_msl}`}
						/>
						<BoardItem
							name="Is Day"
							value={!!weather?.current.is_day ? "Yes" : "No"}
						/>
						<BoardItem
							name="Pecipitation"
							value={`${weather?.current.precipitation}
								${weather?.current_units.precipitation}`}
						/>
						<BoardItem
							name="Rain"
							value={`${weather?.current.rain}
								${weather?.current_units.rain}`}
						/>
						<BoardItem
							name="Showers"
							value={`${weather?.current.showers}
								${weather?.current_units.showers}`}
						/>
						<BoardItem
							name="Snow Fall"
							value={`${weather?.current.snowfall}
								${weather?.current_units.snowfall}`}
						/>
						<BoardItem
							name="Weather Code"
							value={`${weather?.current.weather_code}
								${weather?.current_units.weather_code}`}
						/>
						<BoardItem
							name="Snow Fall"
							value={`${weather?.current.snowfall}
								${weather?.current_units.snowfall}`}
						/>
						<BoardItem
							name="Cloud Cover"
							value={`${weather?.current.cloud_cover}
								${weather?.current_units.cloud_cover}`}
						/>
					</section>
				</div>
				<TableSection subject={"hourly"} title={"Geographic Data (hourly)"} />
				<TableSection subject={"daily"} title={"Geographic Data (daily)"} />
				<NoteSection />
			</div>
		</section>
	);
}
