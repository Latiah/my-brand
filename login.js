function validate(e) {
  e.preventDefault();
  // Get the values of username and password fields
  var emails = document.getElementById("mail").value;
  var password = document.getElementById("password").value;

  //form validations
  if (emails == "") {
    alert("please fill in your email");
    return false;
  }
  if (password == "") {
    alert("please fill in your password");
    return false;
  }
  // aunthentications
  if (emails === "kimtifah2@gmail.com" && password === "Minetocherish2021") {
    alert("Correct input you can now log in successful");
    // window.location.href = "dashboard.html";
    return true;
  } else {
    alert("Invalid username/email or password");
    /*document.getElementById("inputError").innerHTML =
        "Invalid username/email or password";*/
    return false;
  }
}
document.getElementById(Loginform).submit();
