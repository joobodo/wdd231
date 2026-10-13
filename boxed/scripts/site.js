const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isExpanded);
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const lastModified = document.querySelector("#last-modified");
if (lastModified) {
  const modifiedDate = new Date(document.lastModified);
  lastModified.textContent = Number.isNaN(modifiedDate.getTime())
    ? "Date unavailable"
    : modifiedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
