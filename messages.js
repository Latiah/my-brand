//-----Messages--------
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve form data from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");
  const submissionTable = document.getElementById("submissionTable");
  const messageCount = document.getElementById("messageCount");
  if (formSubmissionsString) {
    // Parse form submissions from JSON string
    const formSubmissions = JSON.parse(formSubmissionsString);

    // Populate table with form submissions
    /*var number_messages = formSubmissions.length;
    messageCount.textContent = number_messages;*/
    formSubmissions.forEach((formData, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formData.name}</td>
                <td>${formData.email}</td>
                <td>${formData.message}</td>
                <td><button><a href=mailto:${
                  formData.email
                }>Reply</a></button> </td>
     <td><button onclick="deleting(${index})">Delete</button></td>
            `;
      submissionTable.appendChild(row);
    });
  }
});

function submitForm() {
  // Get form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate form data
  if (name === "" || email === "" || message === "") {
    document.getElementById("Error").innerHTML = "Please fill in all fields.";
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById("Error").innerHTML =
      "Please enter a valid email address.";
    return;
  }

  // Retrieve form submissions from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");
  let formSubmissions = [];

  if (formSubmissionsString) {
    formSubmissions = JSON.parse(formSubmissionsString);
  }

  // Construct an object to hold form data
  const formData = {
    name: name,
    email: email,
    message: message,
  };

  // Add new form data to existing submissions
  formSubmissions.push(formData);

  // Save updated form submissions to local storage
  localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));

  // Redirect to the dashboard
  window.location.href = "messages.html";
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function deleting() {
  var result = confirm("Do you want to delete this message?");
  if (result) {
    deleteEntry();
  }
}
function deleteEntry(index) {
  // Retrieve form submissions from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");

  if (formSubmissionsString) {
    // Parse form submissions from JSON string
    let formSubmissions = JSON.parse(formSubmissionsString);

    // Remove entry at the specified index
    formSubmissions.splice(index, 1);

    // Save updated form submissions to local storage
    localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));

    // Refresh the page to reflect changes
    window.location.reload();
  }
}

