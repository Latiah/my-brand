document.addEventListener("DOMContentLoaded", function () {
    // Retrieve form data from local storage
    var formSubmissionsString = localStorage.getItem("formSubmissions");
    var submissionTable = document.getElementById("submissionTable");
    if (formSubmissionsString && submissionTable) {
        // Parse form submissions from JSON string
        var formSubmissions = JSON.parse(formSubmissionsString);
        // Populate table with form submissions
        formSubmissions.forEach(function (formData, index) {
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>".concat(index + 1, "</td>\n                <td>").concat(formData.name, "</td>\n                <td>").concat(formData.email, "</td>\n                <td>").concat(formData.message, "</td>\n                <td><button><a href=\"mailto:").concat(formData.email, "\">Reply</a></button> <button onclick=\"deleteEntry(").concat(index, ")\">Delete</button></td>\n            ");
            if (submissionTable)
                submissionTable.appendChild(row);
        });
    }
});
function submitForm() {
    // Get form data
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var message = messageInput.value.trim();
    // Validate form data
    var errorElement = document.getElementById("Error");
    if (!name || !email || !message) {
        if (errorElement)
            errorElement.innerHTML = "Please fill in all fields.";
        return;
    }
    if (!isValidEmail(email)) {
        if (errorElement)
            errorElement.innerHTML = "Please enter a valid email address.";
        return;
    }
    // Retrieve form submissions from local storage
    var formSubmissionsString = localStorage.getItem("formSubmissions");
    var formSubmissions = [];
    if (formSubmissionsString) {
        formSubmissions = JSON.parse(formSubmissionsString);
    }
    // Construct an object to hold form data
    var formData = {
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
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function deleteEntry(index) {
    // Retrieve form submissions from local storage
    var formSubmissionsString = localStorage.getItem("formSubmissions");
    if (formSubmissionsString) {
        // Parse form submissions from JSON string
        var formSubmissions = JSON.parse(formSubmissionsString);
        // Remove entry at the specified index
        formSubmissions.splice(index, 1);
        // Save updated form submissions to local storage
        localStorage.setItem("formSubmissions", JSON.stringify(formSubmissions));
        // Refresh the page to reflect changes
        window.location.reload();
    }
}
