var blogs;
  var bloging = document.getElementById("blgs");
  var title = document.querySelector(".subt");
  var photo = document.getElementById("photo");
  if (localStorage.getItem("blogs") == null) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
    let blg = "";
    blogs.forEach(function (element, index) { 
      blg += "<div class=blog1>";
        blg +="<div class=blogs>"; 
      blg += "<div class=subt>" + element.title + "</div>";
      blg += "<p class=blog>" + element.description + "</p>";
        blg += "</div>"; 
    blg+=`<img src=${element.photo} alt=photo class=images>`; 
      blg += "</div>";
    });
    bloging.innerHTML = blg;
  
  }