const levelGrid = document.querySelector("#level-grid");
const levelStatus = document.querySelector("#level-status");
const worldFilter = document.querySelector("#world-filter");
const levelSearch = document.querySelector("#level-search");
const levelDialog = document.querySelector("#level-dialog");
const savedLevelsKey = "boxed-saved-levels";
let levels = [];
let savedStorageError = false;

function getSavedLevels() {
  try {
    const savedLevels = JSON.parse(localStorage.getItem(savedLevelsKey) ?? "[]");
    if (!Array.isArray(savedLevels)) {
      throw new Error("Saved level progress is not a list.");
    }
    savedStorageError = false;
    return savedLevels;
  } catch (error) {
    console.error("Saved level progress could not be read.", error);
    savedStorageError = true;
    return [];
  }
}

function renderLevels() {
  const selectedWorld = worldFilter.value;
  const searchTerm = levelSearch.value.trim().toLocaleLowerCase();
  const visibleLevels = levels.filter((level) => {
    const matchesWorld = selectedWorld === "all" || level.world === selectedWorld;
    const matchesSearch = `${level.name} ${level.world} ${level.mechanic} ${level.objective}`
      .toLocaleLowerCase()
      .includes(searchTerm);
    return matchesWorld && matchesSearch;
  });
  const savedLevels = getSavedLevels();

  levelGrid.innerHTML = visibleLevels.map((level) => {
    const isSaved = savedLevels.includes(level.id);
    return `
      <article class="level-card">
        <div class="level-card__topline">
          <span class="level-number">PUZZLE ${level.id}</span>
          <span class="difficulty">${level.difficulty}</span>
        </div>
        <h3>${level.name}</h3>
        <dl class="level-facts">
          <div><dt>World</dt><dd>${level.world}</dd></div>
          <div><dt>Mechanic</dt><dd>${level.mechanic}</dd></div>
          <div><dt>Goal</dt><dd>${level.objective}</dd></div>
        </dl>
        <div class="level-card__actions">
          <button class="text-button details-button" type="button" data-level-id="${level.id}">Read design note</button>
          <button class="save-button" type="button" data-save-id="${level.id}" aria-pressed="${isSaved}">
            ${isSaved ? "Saved" : "Save puzzle"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  levelStatus.textContent = savedStorageError
    ? "Puzzle concepts loaded, but saved progress is unavailable because browser storage could not be read."
    : visibleLevels.length
      ? `Showing ${visibleLevels.length} of ${levels.length} puzzle concepts. ${savedLevels.length} saved.`
      : "No puzzle concepts match those filters.";
  levelGrid.setAttribute("aria-busy", "false");
}

function openLevelDetails(level) {
  levelDialog.querySelector("#dialog-level-number").textContent = `PUZZLE ${level.id} · ${level.world}`;
  levelDialog.querySelector("#dialog-level-title").textContent = level.name;
  levelDialog.querySelector("#dialog-level-mechanic").textContent = level.mechanic;
  levelDialog.querySelector("#dialog-level-objective").textContent = level.objective;
  levelDialog.querySelector("#dialog-level-note").textContent = level.designNote;
  levelDialog.showModal();
  levelDialog.querySelector(".dialog-close").focus();
}

async function loadLevels() {
  levelStatus.textContent = "Loading puzzle concepts…";
  try {
    const response = await fetch(new URL("../data/levels.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Level data request failed with status ${response.status}.`);
    }
    levels = await response.json();
    if (!Array.isArray(levels) || levels.length < 15) {
      throw new Error("Level data must contain at least 15 puzzle concepts.");
    }
    renderLevels();
  } catch (error) {
    console.error("Puzzle concepts could not be loaded.", error);
    levelGrid.innerHTML = "";
    levelGrid.setAttribute("aria-busy", "false");
    levelStatus.textContent = "Puzzle concepts could not be loaded. Please refresh the page and try again.";
  }
}

levelGrid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-level-id]");
  if (detailsButton) {
    const level = levels.find((item) => item.id === detailsButton.dataset.levelId);
    if (level) openLevelDetails(level);
    return;
  }

  const saveButton = event.target.closest("[data-save-id]");
  if (!saveButton) return;
  if (savedStorageError) {
    levelStatus.textContent = "Progress could not be saved because browser storage is unavailable.";
    return;
  }

  const levelId = saveButton.dataset.saveId;
  const savedLevels = getSavedLevels();
  const updatedLevels = savedLevels.includes(levelId)
    ? savedLevels.filter((savedId) => savedId !== levelId)
    : [...savedLevels, levelId];
  try {
    localStorage.setItem(savedLevelsKey, JSON.stringify(updatedLevels));
    renderLevels();
  } catch (error) {
    console.error("Puzzle progress could not be saved.", error);
    levelStatus.textContent = "Your browser could not save progress. Check your storage settings and try again.";
  }
});

worldFilter.addEventListener("change", renderLevels);
levelSearch.addEventListener("input", renderLevels);
levelDialog.querySelector(".dialog-close").addEventListener("click", () => levelDialog.close());
levelDialog.addEventListener("click", (event) => {
  if (event.target === levelDialog) levelDialog.close();
});

loadLevels();
