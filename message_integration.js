//all messages
function displayMessages(response) {
  const messagesContainer = document.getElementById("messages-container");

  response.data.result.forEach((message, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${index + 1}</td>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td><button><a href=mailto:${
                  message.email
                }>Reply</a></button> </td>
     <td><button onclick="deleting('${message._id}')">Delete</button></td>
            `;
    messagesContainer.appendChild(row);
  });
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU1YTQzMzA2NTgxYmVkNTY4NzcyNGIiLCJlbWFpbCI6ImxpdGhhMkBnbWFpbC5jb20iLCJpYXQiOjE3MDk1NDg2MjUsImV4cCI6MTcwOTYzNTAyNX0.cLPL2JdHjxQx8d7Eoj6Cs-fIlx36-bfgtCDZdTACirM";
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
  axios
    .delete(
      `https://myportifolio-brand-backend.onrender.com/delete-message/${messageId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(console.log("message deleted successfully"))

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
  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;
  const MessageData = {
    name: name,
    email: email,
    message: message,
  };
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
      console.log("message submitted successfully:", response.data);
      nameInput.value = " ";
      emailInput.value = " ";
      messageInput.value = " ";
      // You can perform any necessary actions after successful submission
    })
    .catch((error) => {
      console.error("Error submitting message:", error);
    });
});
