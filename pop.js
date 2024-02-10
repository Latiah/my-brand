 const overlay = document.getElementById("overlay");
 const confirmButton = document.getElementById("confirmButton");
 const confirmYes = document.getElementById("confirmYes");
 const confirmNo = document.getElementById("confirmNo");

 // Function to show the confirmation popup
 function showConfirmationPopup() {
   overlay.style.display = "flex";
 }

 // Function to hide the confirmation popup
 function hideConfirmationPopup() {
   overlay.style.display = "none";
 }

 // Event listener for the confirm button
 confirmButton.addEventListener("click", showConfirmationPopup);

 // Event listener for the "Yes" button in the confirmation popup
 confirmYes.addEventListener("click", function () {
   // Perform the action here
   deleteData();
   alert("Action Confirmed!");
   hideConfirmationPopup();
 });

 // Event listener for the "No" button in the confirmation popup
 confirmNo.addEventListener("click", hideConfirmationPopup);
