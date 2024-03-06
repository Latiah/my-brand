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

  // Add event listeners to like icons
  for (let i = 0; i < response.data.result.length; i++) {
    document.getElementById("like-" + i).addEventListener("click", function () {
      likeBlog(i);
    });
  }

  function likeBlog(blogIndex) {
    const blogId = response.data.result[blogIndex]._id; // Assuming each blog object has an '_id' property
    axios
      .post(
        `https://myportifolio-brand-backend.onrender.com/single-blog/${blogId}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers here
          },
        }
      )
      .then((response) => {
        const likesCountElement = document.getElementById(
          "likes-count-" + blogIndex
        );
        likesCountElement.innerHTML = response.data.likes;
        alert("Thank you for liking this blog👏"); // Assuming the response contains the updated likes count
      })
      .catch((error) => {
        console.error("Error occured while liking blog", error);
      });
  }
  // Add event listeners to like icons
  for (let i = 0; i < response.data.result.length; i++) {
    document
      .getElementById("share-" + i)
      .addEventListener("click", function () {
        shareBlog(i);
      });
  }

  function shareBlog(blogIndex) {
    const blogId = response.data.result[blogIndex]._id;
    axios
      .post(
        `https://myportifolio-brand-backend.onrender.com/single-blog/${blogId}/share`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const sharesCountElement = document.getElementById(
          "shares-count-" + blogIndex
        );
        sharesCountElement.innerHTML = response.data.shares;
        alert("Thank you for sharing this blog👏");
      })
      .catch((error) => {
        console.error("Error occured while sharing this blog", error);
      });
  }
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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MWEyNGYxOWFlYTM5YTNkMDE5ZDMiLCJlbWFpbCI6ImphbWVzQGdtYWlsLmNvbSIsImlhdCI6MTcwOTczMDAyMH0.NL-GsGn8adOFAtoNvhMRReaXTDSHU_XcEkKNa7nFo9c";
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
