import { places } from '../data/places.mjs';

const grid = document.querySelector('#places-grid');
const menuButton = document.querySelector('#menu-button');
const siteNav = document.querySelector('#site-nav');
const visitMessage = document.querySelector('#visit-message');
const dayInMilliseconds = 24 * 60 * 60 * 1000;
const lastVisitKey = 'lagos-discover-last-visit';

function createPlaceCard(place, index) {
  const card = document.createElement('article');
  card.className = `place-card place-${index + 1}`;

  const heading = document.createElement('h2');
  heading.textContent = place.name;

  const figure = document.createElement('figure');
  const image = document.createElement('img');
  image.src = `images/places/${place.image}`;
  image.alt = place.imageAlt;
  image.width = 600;
  image.height = 400;
  image.loading = 'lazy';
  image.decoding = 'async';

  const credit = document.createElement('figcaption');
  const creditLink = document.createElement('a');
  creditLink.href = place.photoSource;
  creditLink.target = '_blank';
  creditLink.rel = 'noopener';
  creditLink.textContent = `Photo: ${place.photoCredit} / Pexels`;
  credit.append(creditLink);
  figure.append(image, credit);

  const address = document.createElement('address');
  address.textContent = place.address;

  const description = document.createElement('p');
  description.textContent = place.description;

  const button = document.createElement('button');
  button.className = 'place-button';
  button.type = 'button';
  button.textContent = 'Learn more';
  button.setAttribute('aria-label', `Learn more about ${place.name}`);
  button.addEventListener('click', () => {
    const mapUrl = new URL('https://www.google.com/maps/search/');
    mapUrl.searchParams.set('api', '1');
    mapUrl.searchParams.set('query', place.mapQuery);
    window.open(mapUrl, '_blank', 'noopener');
  });

  card.append(heading, figure, address, description, button);
  return card;
}

function displayVisitMessage() {
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem(lastVisitKey));

  if (!Number.isFinite(lastVisit) || lastVisit <= 0) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const elapsed = now - lastVisit;
    if (elapsed < dayInMilliseconds) {
      visitMessage.textContent = 'Back so soon! Awesome!';
    } else {
      const days = Math.floor(elapsed / dayInMilliseconds);
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }

  localStorage.setItem(lastVisitKey, String(now));
}

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.textContent = isOpen ? '×' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;
displayVisitMessage();
grid.replaceChildren(...places.map(createPlaceCard));