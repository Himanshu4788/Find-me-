const button = document.getElementById("Search_button");
const input = document.getElementById("city");

const cityName = document.getElementById("city_name");
const cityTime = document.getElementById("city_time");
const cityTemp = document.getElementById("city_temp");
const cityQuality = document.getElementById("city_air_quality");

async function getData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bcf51779f3014aea9c2120434252102&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    } catch (error) {
        alert("Error: " + error.message);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    if (!value) {
        alert("Please enter a city name.");
        return;
    }

    const result = await getData(value);
    if (result) {
        cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTime.innerText = `Local Time: ${result.location.localtime}`;
        cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
        cityQuality.innerText = `Air Quality: ${result.current.air_quality.pm2_5}`;
    }
});
