const followForm = document.querySelector("#follow-form");
const followFeedback = document.querySelector("#follow-feedback");

followForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!followForm.reportValidity()) return;

  const formData = new FormData(followForm);
  const submission = Object.fromEntries(formData.entries());
  submission.topics = formData.getAll("topics");
  submission.submittedAt = new Date().toISOString();

  try {
    sessionStorage.setItem("boxed-follow-submission", JSON.stringify(submission));
    window.location.assign(followForm.action);
  } catch (error) {
    console.error("The update request could not be stored in this browser.", error);
    followFeedback.textContent = "Your browser could not prepare this request. Check your storage settings and try again.";
  }
});
