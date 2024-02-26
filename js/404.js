document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("searchForm");
    const searchIcon = document.querySelector(".navbar__button");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "../404.html";
    });

    searchIcon.addEventListener("click", function () {
        window.location.href = "../404.html";
    });
});