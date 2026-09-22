const menuButton = document.querySelector('#menu-button');
const siteNav = document.querySelector('#site-nav');
const spotlightGrid = document.querySelector('#spotlight-grid');
const membershipLabels = { 2: 'Silver member', 3: 'Gold member' };
const apiKey = 'b0520d6ebd85cb4fc94545dfca993a8a';
const coordinates = 'lat=6.5244&lon=3.3792';

function createSpotlight(member) {
  const card = document.createElement('article');
  card.className = 'member-card';
  card.innerHTML = `
    <div class="member-image"><img src="images/${member.image}" alt="${member.name} logo" width="240" height="160" loading="lazy"></div>
    <div class="member-details">
      <div class="member-topline"><span class="membership membership-${member.membership}">${membershipLabels[member.membership]}</span><span class="member-category">${member.category}</span></div>
      <h3>${member.name}</h3><p>${member.description}</p>
      <address>${member.address}<br><a href="tel:${member.phone.replaceAll(' ', '')}">${member.phone}</a></address>
      <a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit website <span aria-hidden="true">↗</span></a>
    </div>`;
  return card;
}

async function displaySpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Member data could not be loaded.');
    const members = (await response.json()).filter((member) => member.membership === 2 || member.membership === 3);
    members.sort(() => Math.random() - 0.5);
    spotlightGrid.replaceChildren(...members.slice(0, 3).map(createSpotlight));
  } catch (error) {
    spotlightGrid.innerHTML = '<p class="loading error">Spotlights could not be loaded. Please refresh and try again.</p>';
    console.error(error);
  }
}

function formatTemperature(value) { return `${Math.round(value)}°F`; }

function dayLabel(date) { return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date); }

async function displayWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?${coordinates}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${coordinates}&units=imperial&appid=${apiKey}`;
  try {
    const [currentResponse, forecastResponse] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
    if (!currentResponse.ok || !forecastResponse.ok) throw new Error('Weather data is unavailable.');
    const current = await currentResponse.json();
    const forecast = await forecastResponse.json();
    document.querySelector('#current-temp').textContent = formatTemperature(current.main.temp);
    document.querySelector('#weather-description').textContent = current.weather[0].description;
    const icon = document.querySelector('#weather-icon');
    icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    icon.alt = current.weather[0].description;
    const daily = forecast.list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 3);
    document.querySelector('#forecast').replaceChildren(...daily.map((item) => {
      const day = document.createElement('div');
      day.className = 'forecast-day';
      day.innerHTML = `<strong>${dayLabel(new Date(item.dt * 1000))}</strong><span>${formatTemperature(item.main.temp)}</span><small>${item.weather[0].description}</small>`;
      return day;
    }));
  } catch (error) {
    document.querySelector('#weather-status').textContent = 'Weather data is temporarily unavailable.';
    console.error(error);
  }
}

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.textContent = isOpen ? '×' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;
displaySpotlights();
displayWeather();