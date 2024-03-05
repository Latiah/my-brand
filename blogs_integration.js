function displayBlog(response) {
  var bloging = document.getElementById("blgs");
  let blg = "";
  response.data.result.forEach((blog) => {
    blg += "<div class=blog-section>";
    blg += "<div class=blog1>";
    blg += "<div class=blogs>";
    blg += "<div class=subt>" + blog.title + "</div>";
    blg += "<p class=blog>" + blog.description + "</p>";
    blg += "</div>";
    blg += `<img src=${blog.photo} class=images`;
    blg += "</div>";
    blg += "</div>";
  });
  bloging.innerHTML = blg;
}
axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlog)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
//all blogs
function displayBlogs(response) {
  const blogsContainer = document.getElementById("blogstable");

  response.data.result.forEach((blog, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.description}</td>
                <td><button>Edit</button> </td>
     <td><button onclick="deleting('${blog._id}')">Delete</button></td>
            `;
    blogsContainer.appendChild(row);
  });
}

const tokens =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MGQzZGE2ZDkwNmViZTM5NjM0MmQiLCJlbWFpbCI6Im11dG9uaXNAZ21haWwuY29tIiwiaWF0IjoxNzA5NjQxMDQ4LCJleHAiOjE3MDk3Mjc0NDh9.2Xqugt7j0jM1vluBfuGHMXhlujqLj2n6Kon29igpIsA";
axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlogs)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
function deleting(blogId) {
  axios
    .delete(
      `https://myportifolio-brand-backend.onrender.com/delete-blog/${blogId}`,
      {
        headers: {
          Authorization: "Bearer " + tokens,
        },
      }
    )
    .then(alert("blog deleted successfully"))

    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
}

const forms = document.getElementById("bform");
forms.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const photoInput = document.getElementById("photo");
  const title = titleInput.value;
  const description = descriptionInput.value;
  const photo = photoInput.value;
  const BlogData = {
    title: title,
    description: description,
    photo: photo,
  };
  axios
    .post(
      "https://myportifolio-brand-backend.onrender.com/add-blog",
      BlogData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens,
        },
      }
    )
    .then((response) => {
      console.log("blog added successfully:", response.data);
      titleInput.value = " ";
      descriptionInput.value = " ";
      photoInput.value = " ";
    })
    .catch((error) => {
      console.error("Error submitting message:", error);
    });
});