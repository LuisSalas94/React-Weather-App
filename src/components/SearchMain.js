import React, { useState, useEffect } from "react";
import WeatherDetails from "./WeatherDetails";

const SearchMain = () => {
	const [searchTerm, setSearchTerm] = useState("lima");
	const [tempInfo, setTempInfo] = useState({});

	const callWeatherInfoAPI = async () => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=a639ee9c485b15cc8e1502ea8a7c51d6`;

			const resp = await fetch(url);
			const data = await resp.json();
			const { humidity, pressure, temp } = data.main;
			const { main: weatherType } = data.weather[0];
			const { name } = data;
			const { speed } = data.wind;
			const { country, sunset } = data.sys;
			const newWeatherInfo = {
				humidity,
				pressure,
				temp,
				weatherType,
				name,
				speed,
				country,
				sunset,
			};
			setTempInfo(newWeatherInfo);
		} catch (error) {
			console.log("Type of error: ", error);
		}
	};

	useEffect(() => {
		callWeatherInfoAPI();
	}, []);

	return (
		<>
			<div className="wrap">
				<div className="search">
					<input
						type="search"
						placeholder="Search city... "
						id="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className="searchButton" onClick={callWeatherInfoAPI}>
						Search{" "}
					</button>
				</div>
			</div>
			<WeatherDetails {...tempInfo} />
		</>
	);
};

export default SearchMain;
