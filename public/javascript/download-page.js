const progressBar = document.querySelector(".progress");
const button = document.querySelector(".download-btn");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout( () => {
        progressBar.classList.add("hidden");
        button.classList.remove("hidden");
        document.querySelector(".download-heading").innerHTML = "<strong>Click on the button to download.</strong>";
    }, 10000);
});