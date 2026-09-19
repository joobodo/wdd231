const temperature = 4;
const windSpeed = 12;

function calculateWindChill(temperatureCelsius, windSpeedKmh) {
  return 13.12 + (0.6215 * temperatureCelsius) - (11.37 * windSpeedKmh ** 0.16) + (0.3965 * temperatureCelsius * windSpeedKmh ** 0.16);
}

const windChill = document.querySelector('#wind-chill');
const currentYear = document.querySelector('#current-year');
const lastModified = document.querySelector('#last-modified');

if (temperature <= 10 && windSpeed > 4.8) {
  windChill.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`;
} else {
  windChill.textContent = 'N/A';
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;