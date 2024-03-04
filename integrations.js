function displayBlogs(response) {
  const blogsContainer = document.getElementById("blogs-container");

  response.data.result.forEach((blog) => {
    // Create elements to display blog data
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog");

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = "Title: " + blog.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = "Description: " + blog.description;

    const photoElement = document.createElement("img");
    photoElement.src = blog.photo;
    photoElement.alt = blog.title;

    // Append elements to the container
    blogDiv.appendChild(titleElement);
    blogDiv.appendChild(descriptionElement);
    blogDiv.appendChild(photoElement);

    // Add blog div to the container
    blogsContainer.appendChild(blogDiv);
  });
}

axios
  .get("https://myportifolio-brand-backend.onrender.com/all-blogs")
  .then(displayBlogs)
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
