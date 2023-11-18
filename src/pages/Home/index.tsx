import { Favourites, SearchPanel, WeatherPanel } from "./components";
import { Map } from "../../components";

export default function Home() {
	return (
		<section className="h-screen min-w-screen flex">
			<SearchPanel />
			<div className="flex-1 relative">
				<Map />
				<div className="absolute p-5 top-0 z-[99999]">
					<Favourites />
				</div>
			</div>
			<WeatherPanel />
		</section>
	);
}
