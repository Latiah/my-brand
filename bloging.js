var like = document.getElementById("like");
var commenting = document.getElementById("comment");
var share = document.getElementById("share");
var name=document.getElementById("name");
// Retrieve previous data from localStorage if available
var countLike = localStorage.getItem("countLike") || 0;
var countComment = localStorage.getItem("countComment") || 0;
var countShare = localStorage.getItem("countShare") || 0;
//var commenting = localStorage.getItem("commentList") || null;

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
var comments = JSON.parse(localStorage.getItem("comments")) || [];
function addComment(comment) {
  // Create elements
  const li = document.createElement("li");
  const commentText = document.createElement("span");
  const deleteButton = document.createElement("button");
  const replyButton = document.createElement("button");

  // Set text content and attributes
  commentText.textContent = comment.text;
  commenterName.textContent = " - " + comment.name;
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  replyButton.textContent = "Reply";
  replyButton.className = "reply-button";

  // Append elements
  li.appendChild(commentText);
  li.appendChild(commenterName);
  li.appendChild(deleteButton);
  li.appendChild(replyButton);
  commentList.appendChild(li);

  // Add event listener for delete button
  deleteButton.addEventListener("click", function () {
    // Remove the comment from the UI
    commentList.removeChild(li);
    // Remove the comment from the comments array
    const index = comments.indexOf(comment);
    if (index !== -1) {
      comments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  });

  // Increment the comment count and update localStorage
  countComment++;
  commenting.innerHTML =
    countComment+ "<i class=fa fa-share id=share aria-hidden=true></i>";
  localStorage.setItem("countComment", countComment);
  
}
commentButton.addEventListener("click", function () {
  const commentText = commentInput.value.trim();
  const commenterName =name.value.trim // Example name, you should retrieve this dynamically
  if (commentText !== "") {
    addComment({ text: commentText, name: commenterName });
    commentInput.value = "";
  }
});
like.innerHTML =
  countLike + "<i class=fa fa-share id=share aria-hidden=true></i>";
share.innerHTML =
  countShare + "<i class=fa fa-share id=share aria-hidden=true></i>";
commenting.innerHTML=countComment; 

