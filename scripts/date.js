let date = new Date();

document.querySelector("#currentYear").innerHTML = date.getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
