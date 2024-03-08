document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("Loginform");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validate()) {
        return; // Stop form submission if validation fails
      }
      const emailInput = document.getElementById("mail");
      const passwordInput = document.getElementById("password");
      const email = emailInput.value;
      const password = passwordInput.value;
      const loginBtn = document.getElementById("login-btn");

      const loginData = {
        email: email,
        password: password,
      };

      loginBtn.innerHTML = "loading...";

      axios
        .post(
          "https://myportifolio-brand-backend.onrender.com/auth/login",
          loginData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            loginBtn.innerHTML = "succesfuly logged in ✅";
            loginBtn.style.background = "green";
            console.log("user logged in successfully:", response.data);
            console.log(response.data.token);
            const token = response.data.token;
            localStorage.setItem("Usertoken", token);
            // alert("user logged in successfully:");

            setTimeout(() => {
              window.location.href = "./dashboard.html";
            }, 1500);
          } else {
            console.error("Login failed. Invalid credentials.");
            alert("Login failed. Invalid credentials.");
          }
        })
        .catch((error) => {
          console.error("Error while logging in:", error);
          loginBtn.innerHTML = "Invalid credentials";
          loginBtn.style.background = "blue";
          loginBtn.style.color = "white";
          // Consider showing an error message to the user
        });
    });
  }
});

// Define the validate function
function validate() {
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

  return true; // Return true if validation passes
}
