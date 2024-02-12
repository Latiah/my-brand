var like = document.getElementById("like");
var commenting = document.getElementById("comment");
var share = document.getElementById("share");
var nameInput = document.getElementById("name"); // Get the input field for name
// Retrieve previous data from localStorage if available
var countLike = parseInt(localStorage.getItem("countLike")) || 0;
var countComment = parseInt(localStorage.getItem("countComment")) || 0;
var countShare = parseInt(localStorage.getItem("countShare")) || 0;
var comments = JSON.parse(localStorage.getItem("comments")) || [];

like.addEventListener("click", function () {
  countLike++;
  localStorage.setItem("countLike", countLike);
  like.innerHTML =
    countLike + "<i class=fa fa-like id=like aria-hidden=true></i>";
  alert("Thank you for liking this blog ");
});

share.addEventListener("click", function () {
  countShare++;
  localStorage.setItem("countShare", countShare);
  share.innerHTML =
    countShare + "<i class=fa fa-share id=share aria-hidden=true></i>";
  alert("Thank you for sharing this blog");
});

const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const commentButton = document.getElementById("commentBtn");

function addComment(comment) {
  const li = document.createElement("li");
  const commentText = document.createElement("li");
  const commenterName = document.createElement("li");
  const deleteButton = document.createElement("button");
  const replyButton = document.createElement("button");
commenterName.textContent = " A comment from " + comment.name;
  commentText.textContent = comment.text;
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  replyButton.textContent = "Reply";
  replyButton.className = "reply-button";

  li.appendChild(commentText);
  li.appendChild(commenterName);
  li.appendChild(deleteButton);
  li.appendChild(replyButton);
  commentList.appendChild(li);

  deleteButton.addEventListener("click", function () {
    commentList.removeChild(li);
    const index = comments.indexOf(comment);
    if (index !== -1) {
      comments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
      countComment--;
      commenting.innerHTML =
        countComment + "<i class=fa fa-share id=share aria-hidden=true></i>";
      localStorage.setItem("countComment", countComment);
    }
  });

  countComment++;
  commenting.innerHTML =
    countComment + "<i class=fa fa-share id=share aria-hidden=true></i>";
  localStorage.setItem("countComment", countComment);
}

commentButton.addEventListener("click", function () {
  const commentText = commentInput.value.trim();
  const commenterName = nameInput.value.trim(); // Retrieve the name from the input field
  if (commentText !== "" && commenterName !== "") {
    // Check if both comment and name are entered
    addComment({ text: commentText, name: commenterName });
    commentInput.value = "";
    nameInput.value = ""; // Clear the name input field after submitting
  }
});

like.innerHTML =
  countLike + "<i class=fa fa-share id=share aria-hidden=true></i>";
share.innerHTML =
  countShare + "<i class=fa fa-share id=share aria-hidden=true></i>";
commenting.innerHTML =
  countComment + "<i class=fa fa-share id=share aria-hidden=true></i>";

// Display existing comments when the page loads
window.addEventListener("load", function () {
  comments.forEach(function (comment) {
    addComment(comment);
  });
});
