interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve form data from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");
  const submissionTable = document.getElementById("submissionTable");

  if (formSubmissionsString && submissionTable) {
    // Parse form submissions from JSON string
    const formSubmissions: ContactFormData[] = JSON.parse(
      formSubmissionsString
    );

    // Populate table with form submissions
    formSubmissions.forEach((formData, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formData.name}</td>
                <td>${formData.email}</td>
                <td>${formData.message}</td>
                <td><button class="button"><a href="mailto:${
                  formData.email
                }">Reply</a></button> <button class="button" onclick="deleteEntry(${index})">Delete</button></td>
            `;
      if (submissionTable) submissionTable.appendChild(row);
    });
  }
});

function submitForm() {
  // Get form data
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const messageInput = document.getElementById("message") as HTMLInputElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate form data
  const errorElement = document.getElementById("Error");
  if (!name || !email || !message) {
    if (errorElement) errorElement.innerHTML = "Please fill in all fields.";
    return;
  }

  if (!isValidEmail(email)) {
    if (errorElement)
      errorElement.innerHTML = "Please enter a valid email address.";
    return;
  }

  // Retrieve form submissions from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");
  let formSubmissions: ContactFormData[] = [];

  if (formSubmissionsString) {
    formSubmissions = JSON.parse(formSubmissionsString);
  }

  // Construct an object to hold form data
  const formData: ContactFormData = {
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
function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function deleteEntry(index: number) {
  // Retrieve form submissions from local storage
  const formSubmissionsString = localStorage.getItem("formSubmissions");

  if (formSubmissionsString) {
    // Parse form submissions from JSON string
    let formSubmissions: ContactFormData[] = JSON.parse(formSubmissionsString);

    // Remove entry at the specified index
    formSubmissions.splice(index, 1);

    // Save updated form submissions to local storage
    localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));

    // Refresh the page to reflect changes
    window.location.reload();
  }
}
