
// edit, add and delete blogs
function validateForm() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var photo = document.getElementById("photo").value;
  if (title == "") {
    alert("a title is required");
    return false;
  }
  if (description == "") {
    alert("please enter a description!");
    return false;
  }
  if (photo == "") {
    alert("enter image url ");
    return false;
  }
  return true;
}
// function to show data
function showData() {
  var blogs;
  if (localStorage.getItem("blogs") == null) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
  }
  var html = "";
  blogs.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.title + "</td>";
    html += "<td>" + element.description + "</td>";

    html += '<td ><button onclick="update(' + index + ')">Edit </button></td>';
    html +=
      '<td ><button onclick="deleteD(' + index + ')">Delete</button></td>';
    html += '<td ><button onclick="post(' + index + ')">Post</button></td>';
    html += "</tr>";
  });
  document.querySelector("#blogstable tbody").innerHTML = html;
}
//shows all data when page  loads
document.onload = showData();
/*function post(){
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var photo = document.getElementById("photo").value;
  document.querySelector(".blogs").innerHTML = title;
  document.querySelector(".blog").innerHTML = description;
  document.querySelector(".images").innerHTML = photo;
  showData();
   window.location.href = "index.html";
}
*/
function Add() {
  if (validateForm() == true) {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var photo = document.getElementById("photo").value;
    var blogs;
    if (localStorage.getItem("blogs") == null) {
      blogs = [];
    } else {
      blogs = JSON.parse(localStorage.getItem("blogs"));
    }
    blogs.push({
      title: title,
      description: description,
      photo: photo,
    });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    showData();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("photo").value = "";
  }
}
function deleteD(){
  var comfirmation=confirm("Do you want to delete this blog?");
  if(comfirmation){
    deleteData();
  }
}
function deleteData(index) {
  var blogs;
  if (localStorage.getItem("blogs") == null) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
  }
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  showData();
}

function update(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("update").style.display = "block";
  var blogs;
  if (localStorage.getItem("blogs") == null) {
    blogs = [];
  } else {
    blogs = JSON.parse(localStorage.getItem("blogs"));
  }
  document.getElementById("title").value = blogs[index].title;
  document.getElementById("description").value = blogs[index].description;
  document.getElementById("photo").value = blogs[index].photo;
  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      blogs[index].title = document.getElementById("title").value;
      blogs[index].description = document.getElementById("description").value;
      blogs[index].photo = document.getElementById("photo").value;
      localStorage.setItem("blogs", JSON.stringify(blogs));
      showData();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("photo").value = "";
      //hide update and return to add
      document.getElementById("Submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
