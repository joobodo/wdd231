// Select the HTML elements that display the weather data.
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherStatus = document.querySelector('#weather-status');

const apiKey = 'b0520d6ebd85cb4fc94545dfca993a8a';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${apiKey}`;

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;

  const description = data.weather[0].description;
  const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherIcon.setAttribute('src', iconSource);
  weatherIcon.setAttribute('alt', description);
  captionDesc.textContent = description;
  weatherStatus.textContent = '';
}

async function apiFetch() {
  if (apiKey === 'YOUR_API_KEY_HERE') {
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
    weatherIcon.setAttribute('alt', 'Clear sky weather icon preview');
    captionDesc.textContent = 'Add an API key to display current conditions.';
    weatherStatus.textContent = 'Add your OpenWeatherMap API key in scripts/weather.js to load current conditions.';
    return;
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
    weatherStatus.textContent = 'Weather data is temporarily unavailable.';
  }
}

apiFetch();
