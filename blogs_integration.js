// Function to display blogs

const tokens = localStorage.getItem("Usertoken");

function displayBlog(response) {
  var bloging = document.getElementById("blgs");
  let blg = "";
  response.data.result.forEach((blog, index) => {
    blg += "<div class=blog-section>";
    blg += "<div class=blog1>";
    blg += "<div class=blogs>";
    blg += "<div class=subt>" + blog.title + "</div>";
    blg += "<p class=blog>" + blog.description + "<br/>";
    blg +=
      "<i class='fa fa-thumbs-up' id='like-" +
      index +
      "' aria-hidden='true'></i>";
    blg +=
      "<span class='likes-count' id='likes-count-" +
      index +
      "'>" +
      blog.likes +
      "</span>";
    blg += "<i class='fa fa-comment' aria-hidden='true'></i>";
    blg +=
      "<i class='fa fa-share' id='share-" + index + "' aria-hidden='true'></i>";
    blg +=
      "<span class='shares-count' id='shares-count-" +
      index +
      "'>" +
      blog.shares +
      "</span></p>";
    blg += "</div>";
    blg += `<img src=${blog.photo} class=images`;
    blg += "</div>";
    blg += "</div>";
  });
  bloging.innerHTML = blg;

  // Add event listeners to like and share icons
  response.data.result.forEach((blog, index) => {
    document
      .getElementById(`like-${index}`)
      .addEventListener("click", function () {
        likeBlog(index, response);
      });

    document
      .getElementById(`share-${index}`)
      .addEventListener("click", function () {
        shareBlog(index, response);
      });
  });
}

// Function to handle liking a blog
function likeBlog(blogIndex, response) {
  const blogId = response.data.result[blogIndex]._id;

  axios
    .post(
      `https://myportifolio-brand-backend.onrender.com/single-blog/${blogId}/like`,
      {},
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      const likesCountElement = document.getElementById(
        `likes-count-${blogIndex}`
      );
      likesCountElement.innerHTML = response.data.likes;
      alert("Thank you for liking this blog👏");
    })
    .catch((error) => {
      console.error("Error occurred while liking blog", error);
    });
}

// Function to handle sharing a blog
function shareBlog(blogIndex, response) {
  const blogId = response.data.result[blogIndex]._id;

  axios
    .post(
      `https://myportifolio-brand-backend.onrender.com/single-blog/${blogId}/share`,
      {},
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      const sharesCountElement = document.getElementById(
        `shares-count-${blogIndex}`
      );
      sharesCountElement.innerHTML = response.data.shares;
      alert("Thank you for sharing this blog👏");
    })
    .catch((error) => {
      console.error("Error occurred while sharing this blog", error);
    });
}

axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlog)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
let blogs = [];
// Function to display all blogs
function displayBlogs(response) {
  const blogsContainer = document.getElementById("blogstable");

  response.data.result.forEach((blog) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${blog.title}</td>
      <td>${blog.description}</td>
      <td><button  onclick="editBlog('${blog._id}')" id="editing-${blog._id}">Edit</button></td>
      <td><button onclick="deleting('${blog._id}')" id="edit-${blog._id}">Delete</button></td>`;
    blogsContainer.appendChild(row);
  });

  blogs = response.data.results;
}

// Function to delete a blog
// Function to delete a blog
function deleting(blogId) {
  const deleteId = document.getElementById(`edit-${blogId}`);
  deleteId.textContent = "deleting ..";
  deleteId.style.background = "red";
  deleteId.style.color = "white";
  deleteId.style.border = "none";
  deleteId.style.borderRadius = "10px";
  axios
    .delete(
      `https://myportifolio-brand-backend.onrender.com/delete-blog/${blogId}`,
      { headers: { Authorization: "Bearer " + tokens } }
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

async function editBlog(blogId) {
  const deleteId = document.getElementById(`editing-${blogId}`);

  const editForm = document.getElementById("edit-blog-form");
  const editTitles = document.getElementById("edit-title");
  const editDescription = document.getElementById("edit-description");
  const editPhoto = document.getElementById("edit-photo");

  editForm.style.display = "block";
  forms.style.display = "none";

  const res = await axios.get(
    `https://myportifolio-brand-backend.onrender.com/single-blog/${blogId}`,
    { headers: { Authorization: "Bearer " + tokens } }
  );

  const blogData = res.data.result;

  console.log(blogData);

  editTitles.value = blogData.title;
  editDescription.value = blogData.description;
  editPhoto.value = blogData.photo;

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://myportifolio-brand-backend.onrender.com/update-blog/${blogId}`,
        {
          title: editTitles.value,
          description: editDescription.value,
          photo: editPhoto.value,
        },
        { headers: { Authorization: "Bearer " + tokens } }
      );

      console.log("Blog entry updated:", response.data);

      editForm.style.display = "none";
      forms.style.display = "block";
    } catch (error) {
      console.error("Error updating blog entry:", error);
    }
  });
}

// Define helper function to fetch and display blogs

// Function to handle form submission for adding a blog
const forms = document.getElementById("bform");
forms.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const photoInput = document.getElementById("photo");

  const success = document.getElementById("success");
  const submitBtn = document.getElementById("submt-btn");

  const title = titleInput.value;
  const description = descriptionInput.value;
  const photo = photoInput.value;

  const BlogData = {
    title: title,
    description: description,
    photo: photo,
  };

  submitBtn.style.background = "orange";
  submitBtn.innerHTML = "Loading";
  submitBtn.style.color = "white";

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
      submitBtn.innerHTML = "Succes👌";
      submitBtn.style.background = "green";
      submitBtn.style.color = "white";
      success.style.display = "block";

      setTimeout(() => {
        forms.reset();
        submitBtn.innerHTML = "Add new Blog";
        submitBtn.style.background = "";
        submitBtn.style.color = "";

        success.style.display = "none";
        window.location.reload();
      }, 1700);
    })
    .catch((error) => {
      console.error("Error submitting message:", error);
    });
});

// Fetch all blogs
axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlogs)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
