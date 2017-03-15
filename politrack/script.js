function toggleDropdown() {
    document.querySelector(".dropdown").classList.toggle("open");
    console.log("toggle!");
}
var dropdown = document.querySelector("#adv-options");
dropdown.addEventListener("click", toggleDropdown);