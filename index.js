const api_key = "53636c75d1fb915c0395beacf0bfc700";

const weatherBox = document.querySelector(".weather-box");
const btn = document.getElementById("btn");
const input = document.querySelector("input");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");

btn.addEventListener("click", () => {
  let city = input.value;
  if (city === "") {
    alert("Enter City Name!");
  }
  getCity(city);
});

function getCity(city) {
  console.log(city);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod == 404) {
        alert(data.message);
      }
      const iconCode = data.weather[0].icon;
      weatherBox.style.background = "linear-gradient(148deg,  rgb(164, 210, 173), rgb(230, 230, 152))";
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;

      const weatherCity = data.name;
      const weatherCountry = data.sys.country;
      weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

      let weatherTemp = data.main.temp;
      weatherTemp = weatherTemp - 273;
      let celsius = weatherTemp.toFixed(2);
      temprature.innerHTML = `<span>${celsius}</span>&deg;C`;

      const weatherDesc = data.weather[0].description;
      description.innerHTML = `${weatherDesc}`;
    });
}
