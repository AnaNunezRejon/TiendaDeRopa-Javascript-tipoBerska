document.addEventListener("DOMContentLoaded", function () {
    let toggle = document.getElementById("toggle");
    let label__toggle = document.getElementById("label__toggle");
    let darkModeLink = document.getElementById("darkModeLink");

    darkModeLink.href = "css/style.css";

    toggle.checked = false; 

    toggle.addEventListener("change", (event) => {
        let seleccionado = event.target.checked;

        if (seleccionado) {
            darkModeLink.href = "css/dark.css";
            label__toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            label__toggle.style.color = "white";
        } else {
            darkModeLink.href = "css/style.css";
            label__toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            label__toggle.style.color = "var(--white)";
        }
    });
});