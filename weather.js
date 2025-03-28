const API_KEY = "process.env.API_KEY";

export const fetchWeather = async (cityLocation = "Paris") => {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityLocation}&aqi=yes`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        console.log(data);

        const {
            location: { name: city },
            current: { temp_c: temp, condition: { icon }, wind_kph: wind, humidity, uv, feelslike_c: feelslike }
        } = data;

        document.querySelector(".card-title").textContent = city;
        document.querySelector(".card-img").src = icon;
        document.querySelectorAll(".list-group-item")[0].textContent = `Temperature: ${temp}°C`;
        document.querySelectorAll(".list-group-item")[1].textContent = `Humidity: ${humidity}%`;
        document.querySelectorAll(".list-group-item")[2].textContent = `Feels like: ${feelslike}°C`;
        document.querySelectorAll(".list-group-item")[3].textContent = `Wind: ${wind} km/h`;
        document.querySelectorAll(".list-group-item")[4].textContent = `UV: ${uv}`;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};