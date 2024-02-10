let menuBtn = document.getElementById("menu");
let links = document.getElementById("links");

menuBtn.addEventListener("click", function (e) {
  links.classList.toggle("responsive");
  menuBtn.classList.toggle("fa-x");
});
