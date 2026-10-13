const resultMessage = document.querySelector("#result-message");
const resultDetails = document.querySelector("#result-details");

try {
  const savedSubmission = sessionStorage.getItem("boxed-follow-submission");
  if (!savedSubmission) {
    resultMessage.textContent = "No update request was found. You can send one from the Dev Journal page.";
  } else {
    const submission = JSON.parse(savedSubmission);
    resultMessage.textContent = "Your request is saved in this browser session. No email has been sent.";
    const entries = [
      ["Name", submission.name],
      ["Email", submission.email],
      ["Platform", submission.platform],
      ["Topics", Array.isArray(submission.topics) ? submission.topics.join(", ") : submission.topics]
    ];
    entries.forEach(([label, value]) => {
      const item = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value || "Not provided";
      item.append(term, description);
      resultDetails.append(item);
    });
    sessionStorage.removeItem("boxed-follow-submission");
  }
} catch (error) {
  console.error("The saved update request could not be read.", error);
  resultMessage.textContent = "The saved request could not be displayed. Please return to the Dev Journal and try again.";
}
