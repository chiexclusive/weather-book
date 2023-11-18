import { WeatherFocast } from "../../../utils/enums";

interface WeatherMarkerProps {
	forcast: WeatherFocast;
	temperature: number;
	unit: string;
}

export default function WeatherMarker({
	forcast,
	temperature,
	unit,
}: WeatherMarkerProps) {
	return (
		<div className="relative w-fit">
			<img
				src={`/cloudy.png`}
				// src={`/${forcast.toLowerCase().replaceAll(" ", "")}.png`}
				alt=""
				width={100}
				style={{ width: "40px !important" }}
			/>
			<div className="absolute flex items-center justify-center top-0 left-0 w-full h-full">
				<span
					className="text-white"
					style={{
						textShadow:
							"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
					}}
				>
					<span className="font font-extrabold text-lg">{temperature}</span>
					<sup>{unit}</sup>
				</span>
			</div>
		</div>
	);
}
