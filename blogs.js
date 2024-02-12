var blogs;
  var bloging = document.getElementById("blgs");
  var title = document.querySelector(".subt");
  // Get the input element
  /* var blogcount = document.getElementById("likes");
   blogcount.innerHTML = blogs.length;*/
  if (localStorage.getItem("blogs") == null) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
    let blg = "";
    blogs.forEach(function (element, index) {
      blg += "<div class=blog1>";
      blg += "<div class=blogs>";
      blg += "<div class=subt>" + element.title + "</div>";
      blg += "<p class=blog>" + element.description + "</p>";
      blg += "</div>";
      blg += `<img src=${element.photo}`;
      blg += "</div>";
  
    });
    bloging.innerHTML = blg;
  }
