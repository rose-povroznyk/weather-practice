'use strict';
// https://api.openweathermap.org/data/2.5/weather?q=Ternopil&appid=f7c576ba3699bdd0b98ddcf196639992

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f7c576ba3699bdd0b98ddcf196639992';

const btn = document.querySelector('.btn');

btn.addEventListener('click', buttonClickHandler);

function buttonClickHandler({ target }) {
  const selectValue = target.previousElementSibling.value;
  requestApi(selectValue);
}

function requestApi(cityName) {
  const url = `${API_BASE}?q=${cityName}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

// <!-- <article class="weather">
// <p>City name: Kyiv</p>
// <p>Temperature: 7°C</p>
// <p>Weather description: overcast clouds</p>
// </article> -->

function displayWeather(weatherObj) {
  const {
    name,
    main: { temp },
    weather: [{ description }],
  } = weatherObj;

  const article = document.createElement('article');
  article.classList.add('weather');
  const cityName = document.createElement('p');
  cityName.append(`City name: ${name}`);

  const temperature = document.createElement('p');
  temperature.append(`Temperature: ${temp}°C`);

  const weatherDescr = document.createElement('p');
  weatherDescr.append(`Weather description: ${description}`);

  article.append(cityName, temperature, weatherDescr);
  const section = document.querySelector('.wrapper');

  if (document.querySelector('.weather')) {
    document.querySelector('.weather').remove();
  }
  section.append(article);
  console.dir(section);
}
