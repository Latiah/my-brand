let menuBtn = document.getElementById("menu");
let links = document.getElementById("links");

menuBtn.addEventListener("click", function (e) {
  links.classList.toggle("responsive");
  menuBtn.classList.toggle("fa-x");
});

//contact form validation
function validform() {
  // Reset error messages
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("messageError").innerHTML = "";

  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Validate name
  if (name === "") {
    document.getElementById("nameError").innerHTML = "please enter your name";
    return false;
  }
  if(name.lenght>3){
    return true;
  }

  // Validate email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailError").innerHTML = "Email is required";
    return false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerHTML = "The email you entered is  not a valid format";
    return false;
  }

  // Validate message
  if (message === "") {
    document.getElementById("messageError").innerHTML = "A Message is required";
    return false;
  }
  if (message.length < 10) {
    document.getElementById("messageError").innerHTML =
      "Message can not be less that 10 characters";
    return false;
  }

  // If all validations pass, you can submit the form
  document.getElementById("contactForm").submit();
}
