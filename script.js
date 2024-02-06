
// edit, add and delete blogs
function validateForm(){
  var title=document.getElementById("title").value;
   var description = document.getElementById("description").value;
    var photo= document.getElementById("photo").value;
    if(title ==""){
      alert("a title is required");
      return false;
    }
     if (description == "") {
       alert("please enter a description!");
       return false;
     }
      if (photo == "") {
    alert("upload a photo");
        return false;
      }
      return true;
}
// function to show data
function showData(){
  var blogs;
  if(localStorage.getItem("blogs")== null){
    blogs=[];
  }
  else{
    blogs=JSON.parse(localStorage.getItem("blogs"));
  }
    var html="";
    blogs.forEach(function (element, index){
html +="<tr>";
html +="<td>"+ element.title +"</td>";
html += "<td>" + element.description + "</td>";
html += "<td>" + element.photo + "</td>";

html +='<td ><button onclick="update('+index+')">Edit </button> <button onclick="deleteData('+index+')">Delete</button></td>';
html += "</tr>";
 });
 document.querySelector("#blogstable tbody").innerHTML=html;

  }
  //shows all data when page  loads 
  document.onload=showData();

  function Add(){
    if(validateForm()==true){
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
        title:title,
description:description,
photo:photo,
       }
       );
       localStorage.setItem("blogs",JSON.stringify(blogs));
       showData();
       document.getElementById("title").value="";
document.getElementById("description").value = "";       
document.getElementById("photo").value = "";
       
    }
  }
function deleteData(index){
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

function update(index){
  document.getElementById("Submit").style.display="none";
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
    document.querySelector("#update").onclick=function(){
      if(validateForm()==true){
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
    }   

}
function validate(){

    // Get the values of username and password fields
    var emails = document.getElementById("mail").value;
    var password = document.getElementById("password").value;

    //form validations
    if (emails==""){
       
      alert("please fill in your email");
      return false;
    }
    if (password==""){
      alert("please fill in your password");
      return false;
    }
    // aunthentications
    if (emails=== "kimtifah2@gmail.com" && password === "Minetocherish2021") {
      alert("Correct input you can now log in successful");
      window.location.href="/dashboard.html";
      return true;

    } else {
      alert("Invalid username/email or password");
      /*document.getElementById("inputError").innerHTML =
        "Invalid username/email or password";*/
      return false;
    }
  }
  document.getElementById(Loginform).submit();