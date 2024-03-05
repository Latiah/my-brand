const form = document.getElementById("signform");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = document.getElementById("mail");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  const signData = {
    email: email,
    password: password,
  };
  axios
    .post(
      "https://myportifolio-brand-backend.onrender.com/auth/register",
      signData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("user created successfully:", response.data);
      emailInput.value = " ";
      passwordInput.value = " ";
    })
    .catch((error) => {
      console.error("Error while registering:", error);
    });
});
