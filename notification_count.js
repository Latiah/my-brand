function displayMessages(response) {
  const messageCount = document.getElementById("msegs");

  response.data.result.forEach((message, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${message.name}</td>
          <td>${message.email}</td>
          <td>${message.message}</td>
          <td><button><a href=mailto:${message.email}>Reply</a></button></td>
          <td><button onclick="deleting('${message._id}')">Delete</button></td>
        `;
  });
  messageCount.innerHTML = response.data.result.length;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MGQzZGE2ZDkwNmViZTM5NjM0MmQiLCJlbWFpbCI6Im11dG9uaXNAZ21haWwuY29tIiwiaWF0IjoxNzA5NjQxMDQ4LCJleHAiOjE3MDk3Mjc0NDh9.2Xqugt7j0jM1vluBfuGHMXhlujqLj2n6Kon29igpIsA";
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

//all blogs
function displayBlogs(response) {
  const blogsCount = document.getElementById("blogicon");

  response.data.result.forEach((blog, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.description}</td>
                <td><button>Edit</button> </td>
     <td><button onclick="deleting('${blog._id}')">Delete</button></td>
            `;
  });
  blogsCount.innerHTML = response.data.result.length;
}

const tokens =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MGQzZGE2ZDkwNmViZTM5NjM0MmQiLCJlbWFpbCI6Im11dG9uaXNAZ21haWwuY29tIiwiaWF0IjoxNzA5NjQxMDQ4LCJleHAiOjE3MDk3Mjc0NDh9.2Xqugt7j0jM1vluBfuGHMXhlujqLj2n6Kon29igpIsA";
axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlogs)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });