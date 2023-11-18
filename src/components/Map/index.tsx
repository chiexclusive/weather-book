import {
	MapContainer,
	ScaleControl,
	TileLayer,
	ZoomControl,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { LatLngExpression, Map as MapType, divIcon } from "leaflet";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ReactDOMServer from "react-dom/server";
import { WeatherFocast } from "../../utils/enums";
import WeatherMarker from "./WeatherMarker";
import { determineWeather } from "../../utils/helper";
import { useLazyGetLocationDataQuery } from "../../redux/services/location.service";
import { useGetCitiesQuery } from "../../redux/services/city.service";
import { setLocation } from "../../redux/features/city";

const MapContent = () => {
	const dispatch = useAppDispatch();
	const [city, setCity] = useState("");
	const isMyLocation = useRef(false);
	const { data: cityData, isFetching } = useGetCitiesQuery(city);
	const [trigger, { data: locationData }] = useLazyGetLocationDataQuery();
	const setUserLocation = (position: {
		latitude: number;
		longitude: number;
	}) => {
		trigger({ lat: position.latitude, lng: position.longitude });
	};
	const weather = useAppSelector((state) => state.weather.weather);
	const forcast = useMemo(() => {
		if (!weather) return WeatherFocast.UNKNOWN;
		return determineWeather(weather.current);
	}, [weather]);

	const map = useMapEvents({
		dblclick(e) {
			setUserLocation({
				latitude: e.latlng.lat,
				longitude: e.latlng.lng,
			});
		},
	});

	const markerIcon = divIcon({
		className: "custom-icon",
		html: ReactDOMServer.renderToString(
			<WeatherMarker
				forcast={forcast as unknown as WeatherFocast}
				temperature={+(weather?.current?.temperature_2m || 0)}
				unit={weather?.current_units?.temperature_2m || ""}
			/>,
		),
	});

	const location = useAppSelector((state) => state.city.location);

	const flyto = (lat: number, long: number, zoom?: number) => {
		if (!map) return;
		map.flyTo([lat, long], zoom || 15, {
			duration: 2,
		});
	};

	useEffect(() => {
		if (!location) return;
		flyto(location.latitude, location.longitude);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	const locationCoords = useMemo(() => {
		if (!location)
			return {
				lat: 0,
				lng: 0,
			};
		return { lat: location.latitude, lng: location.longitude };
	}, [location]);

	useEffect(() => {
		if (!locationData) return;
		setCity(
			locationData?.address?.city ||
				locationData?.address?.town ||
				locationData?.address?.region ||
				locationData?.address?.province ||
				locationData?.address?.village ||
				locationData?.address?.state ||
				locationData?.address?.county ||
				locationData?.address?.country,
		);
		console.log(locationData?.address?.city);
	}, [locationData]);

	useEffect(() => {
		if (!cityData?.results) return;
		dispatch(
			setLocation({
				...cityData?.results?.[0],
				isMyLocation: isMyLocation.current,
			}),
		);
		isMyLocation.current = false;
	}, [cityData, dispatch]);

	const getUserLocation = () => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition(
			(e: GeolocationPosition) => {
				isMyLocation.current = true;
				setUserLocation({
					latitude: e.coords.latitude,
					longitude: e.coords.longitude,
				});
			},
			function (error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						console.warn("User denied the request for Geolocation.");
						break;
					case error.POSITION_UNAVAILABLE:
						console.warn("Location information is unavailable.");
						break;
					case error.TIMEOUT:
						console.warn("The request to get user location timed out.");
						break;
				}
			},
		);
	};
	useEffect(() => {
		getUserLocation();
	}, []);

	return (
		<Fragment>
			<TileLayer url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=88zD6zFJQ1QnY5rqb4ik" />
			<ScaleControl position="bottomleft" metric imperial={false} />
			<ZoomControl position="bottomright" />
			{weather && (
				<Marker position={locationCoords as LatLngExpression} icon={markerIcon}>
					<Popup>{location?.name}</Popup>
				</Marker>
			)}
		</Fragment>
	);
};

export default function Map() {
	const position = [51.505, -0.09];
	const mapRef = useRef<MapType>(null);

	return (
		<MapContainer
			center={position as any}
			zoom={13}
			scrollWheelZoom
			style={{
				width: "100%",
				height: "100dvh",
			}}
			doubleClickZoom
			zoomControl={false}
			ref={mapRef}

			// ondblclick={handleDoubleClick}
		>
			<MapContent />
		</MapContainer>
	);
}
