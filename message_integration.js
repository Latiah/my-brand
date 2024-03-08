const token = localStorage.getItem("Usertoken");

// Function to display messages
function displayMessages(response) {
  const messagesContainer = document.getElementById("messages-container");
  const messageCount = document.getElementById("msegs");

  response.data.result.forEach((message, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${message.name}</td>
      <td>${message.email}</td>
      <td>${message.message}</td>
      <td><button><a href=mailto:${message.email}>Reply</a></button></td>
      <td><button onclick="deleting('${message._id}')" id="edit-${
      message._id
    }">Delete</button></td>
    `;
    messagesContainer.appendChild(row);
  });
  messageCount.innerHTML = response.data.result.length;
}

// Fetch all messages
axios
  .get("https://myportifolio-brand-backend.onrender.com/all-messages", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then(displayMessages)
  .catch((error) => {
    console.error("Error fetching messages:", error);
  });

// Function to delete a message
function deleting(messageId) {
  const deleteId = document.getElementById(`edit-${messageId}`);
  deleteId.textContent = "deleting ..";
  deleteId.style.background = "red";
  deleteId.style.color = "white";
  deleteId.style.border = "none";
  deleteId.style.borderRadius = "10px";

  axios
    .delete(
      `https://myportifolio-brand-backend.onrender.com/delete-message/${messageId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        deleteId.textContent = "Succesfully deleted ✅";
        deleteId.style.background = "green";
        deleteId.style.color = "white";
        deleteId.style.border = "none";
        deleteId.style.borderRadius = "10px";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
}

// Submit message form
const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (submitForm()) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const submitBtn = document.getElementById("contact-btn");
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    const MessageData = {
      name: name,
      email: email,
      message: message,
    };

    submitBtn.innerHTML = "sending message";
    submitBtn.style.backgroundColor = "orange";
    submitBtn.style.color = "white";
    axios
      .post(
        "https://myportifolio-brand-backend.onrender.com/add-message",
        MessageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        submitBtn.innerHTML = "your message was sent succesfuly ✔";
        submitBtn.style.backgroundColor = "green";
        submitBtn.style.color = "white";
        console.log("message submitted successfully:", response.data);
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        setTimeout(() => {
          submitBtn.innerHTML = "Submit";
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "black";
          form.reset();
        }, 1500);
      })
      .catch((error) => {
        console.error("Error submitting message:", error);
      });
  }
});

// Function to validate the form
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const errorElement = document.getElementById("Error");
  errorElement.innerHTML = ""; // Clear previous error messages

  // Validate name, email, and message
  if (name === "") {
    errorElement.innerHTML = "Please fill in your name.";
    return false;
  }

  if (email === "") {
    errorElement.innerHTML = "Please fill in your email.";
    return false;
  } else if (!isValidEmail(email)) {
    errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (message === "") {
    errorElement.innerHTML = "Please fill in your message.";
    return false;
  }

  return true;
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
