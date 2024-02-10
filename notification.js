const formSubmissionsString = localStorage.getItem("formSubmissions");
  const submissionTable = document.getElementById("submissionTable");
  const messageCount = document.getElementById("messageCount");
  if (formSubmissionsString) {
    // Parse form submissions from JSON string
    const formSubmissions = JSON.parse(formSubmissionsString);

    // Populate table with form submissions
    /*var number_messages = formSubmissions.length;
    messageCount.textContent = number_messages;*/
var counts=document.querySelector("#msegs");
counts.innerHTML = formSubmissions.length;
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

  