const cityName = document.getElementById("cityName");
const getBtn = document.getElementById("getBtn");
const currentWeather = document.querySelector(".currentWeather span");
const min_temp = document.querySelector(".min-temp span");
const max_temp = document.querySelector(".max-temp span");
const city_name = document.querySelector(".city-name span");
const weather_icon = document.getElementById("weather_icon");
const humidity = document.querySelector(".humidity span");
const weatherDescription = document.querySelector(".weather-description span");

async function getWeather(city) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},tn,in&limit=15&appid=c2992e8e9788c5d112051a7a743a1b70`
    );
    let data = await response.json();
    console.log("Geo API Response:", data);
    if (!data.length) throw new Error("Invalid city");
    let lat = data[0].lat,
      lon = data[0].lon;
    city_name.textContent = data[0].name;
    cityWeather(lat, lon);
  } catch (error) {
    alert("There is a typo in your city name");
  }
}

async function cityWeather(lat, lon) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c2992e8e9788c5d112051a7a743a1b70&units=metric`
    );
    let data = await response.json();
    console.log("Weather API Response:", data);
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    currentWeather.textContent = Math.floor(data.main.temp);
    min_temp.textContent = Math.floor(data.main.temp_min);
    max_temp.textContent = Math.floor(data.main.temp_max);
    weather_icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.textContent = data.main.humidity + "%";
    weatherDescription.textContent = data.weather[0].description;
  } catch (error) {
    alert("Error fetching weather data: " + error.message);
  }
}

getBtn.addEventListener("click", () => {
  if (isNaN(cityName.value)) {
    getWeather(cityName.value);
    cityName.value = "";
  } else {
    alert("Enter a valid input");
  }
});
