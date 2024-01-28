function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function Delete() {
  document.getElementById("row").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

//navigation

let menuBtn = document.getElementById("menu");
let links = document.getElementById("links");

menuBtn.addEventListener("click", function (e) {
  links.classList.toggle("responsive");
  menuBtn.classList.toggle("fa-x");
});