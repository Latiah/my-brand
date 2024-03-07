//all messages

const token = localStorage.getItem("Usertoken");
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
        deleteId.textContent = "Succesfuly deleted ✅";
        deleteId.style.background = "green";
        deleteId.style.color = "white";
        deleteId.style.border = "none";
        deleteId.style.borderRadius = "10px";
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        // helper()
      }
    })

    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
}

const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
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
      nameInput.value = " ";
      emailInput.value = " ";
      messageInput.value = " ";

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
});
