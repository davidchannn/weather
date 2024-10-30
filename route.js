import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;

const logIn = async (cityName) => {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`);
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    if (data.error) {
        throw new Error("Invalid API Key");
    }
    return data;
};

const printInformation = (weather) => {
    console.log("Location: " + weather.location.name + ", " + weather.location.country);
    console.log("Latitude: " + weather.location.lat);
    console.log("Longitude: " + weather.location.lon);
    console.log("Temperature: " + weather.current.temperature + " C.");
    console.log("UV Index: " + weather.current.uv_index);
    console.log("Wind Speeds: " + weather.current.wind_speed);
};

logIn("Irvine")
    .then((data) => printInformation(data))
    .catch((error) => console.error("Error: " + error));
