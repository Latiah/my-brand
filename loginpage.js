document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("Loginform");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("mail");
      const passwordInput = document.getElementById("password");
      const email = emailInput.value;
      const password = passwordInput.value;

      const loginData = {
        email: email,
        password: password,
      };

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
            console.log("user logged in successfully:", response.data);
            console.log(response.data.token);
            const token = response.data.token;
            localStorage.setItem("Usertoken", token);
            alert("user logged in successfully:");
            window.location.href = "dashboard.html";
          } else {
            console.error("Login failed. Invalid credentials.");
            alert("Login failed. Invalid credentials.");
          }
        })
        .catch((error) => {
          console.error("Error while logging in:", error);
          // Consider showing an error message to the user
        });
    });
  }
});
