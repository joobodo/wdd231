export function setTitle(course) {
  document.querySelector('#courseTitle').textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const sectionTable = document.querySelector('#sections');
  sectionTable.replaceChildren();

  sections.forEach((section) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${section.sectionNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.instructor}</td>
    `;
    sectionTable.appendChild(row);
  });
}
