function toggleDropdown() {
    document.querySelector(".dropdown").classList.toggle("open");
    console.log("toggle!");
}
var dropdown = document.querySelector("#adv-options");
dropdown.addEventListener("click", toggleDropdown);
var ors_menu = document.querySelector("#ors_menu");
var ors_button = document.querySelector("#ors");
var ure_button = document.querySelector("#ure");
var ure_menu = document.querySelector("#ure_menu");

function showOrsMenu() {
    console.log("Show Legislators Menu");
    ure_menu.style.display = "none";
    ors_menu.style.display = "block";
    document.querySelector(".form-control").placeholder = "Search for Legislator by Name";
}

function showUreMenu() {
    console.log("Show Legislature Menu");
    ors_menu.style.display = "none";
    ure_menu.style.display = "block";
    document.querySelector(".form-control").placeholder = "Search for Legislation or Bill ID";
}
showOrsMenu();
ors_button.addEventListener("click", showOrsMenu);
ure_button.addEventListener("click", showUreMenu);