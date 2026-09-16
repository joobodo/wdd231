const memberGrid = document.querySelector('#member-grid');
const gridViewButton = document.querySelector('#grid-view');
const listViewButton = document.querySelector('#list-view');
const menuButton = document.querySelector('#menu-button');
const siteNav = document.querySelector('#site-nav');

const membershipLabels = {
  1: 'Member',
  2: 'Silver member',
  3: 'Gold member'
};

function createMemberCard(member) {
  const card = document.createElement('article');
  card.className = 'member-card';
  card.innerHTML = `
    <div class="member-image"><img src="images/${member.image}" alt="${member.name} mark" width="240" height="160" loading="lazy"></div>
    <div class="member-details">
      <div class="member-topline">
        <span class="membership membership-${member.membership}">${membershipLabels[member.membership]}</span>
        <span class="member-category">${member.category}</span>
      </div>
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <address>${member.address}<br><a href="tel:${member.phone.replaceAll(' ', '')}">${member.phone}</a></address>
      <a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit website <span aria-hidden="true">↗</span></a>
    </div>
  `;
  return card;
}

async function displayMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Unable to load member data: ${response.status}`);
    const members = await response.json();
    memberGrid.replaceChildren(...members.map(createMemberCard));
  } catch (error) {
    memberGrid.innerHTML = '<p class="loading error">Member businesses could not be loaded. Please refresh and try again.</p>';
    console.error(error);
  }
}

function setView(view) {
  const listView = view === 'list';
  memberGrid.classList.toggle('list-view', listView);
  gridViewButton.classList.toggle('active', !listView);
  listViewButton.classList.toggle('active', listView);
  gridViewButton.setAttribute('aria-pressed', String(!listView));
  listViewButton.setAttribute('aria-pressed', String(listView));
}

gridViewButton.addEventListener('click', () => setView('grid'));
listViewButton.addEventListener('click', () => setView('list'));
menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.textContent = isOpen ? '×' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;
displayMembers();
