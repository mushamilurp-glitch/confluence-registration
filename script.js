// script.js
console.log("Script Connected");
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");
let isSubmitting = false;

/*
Replace this URL later
with your Google Apps Script Web App URL
*/

const scriptURL = "https://script.google.com/macros/s/AKfycbx3x0yleTCSBCPIug96DZAa8g_cdAMXhPUmsvrr_dZSuiryFsZaA9DZ9fHDqOZx34xg/exec";

// Check if phone number was already submitted
function isPhoneAlreadySubmitted(phone) {
  const submittedPhones = JSON.parse(localStorage.getItem("submittedPhones")) || [];
  return submittedPhones.includes(phone);
}

// Store submitted phone number
function storeSubmittedPhone(phone) {
  const submittedPhones = JSON.parse(localStorage.getItem("submittedPhones")) || [];
  if (!submittedPhones.includes(phone)) {
    submittedPhones.push(phone);
    localStorage.setItem("submittedPhones", JSON.stringify(submittedPhones));
  }
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  // Prevent multiple submissions
  if (isSubmitting) return;

  const phone = document.getElementById("phone").value;

  // Check for duplicate submission
  if (isPhoneAlreadySubmitted(phone)) {
    successMessage.innerHTML =
      "⚠️ This phone number has already been registered. Please use a different phone number.";
    successMessage.style.color = "#ffb3b3";
    return;
  }

  isSubmitting = true;

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Loading...";

  const data = {
    name: document.getElementById("name").value,
    course: document.getElementById("course").value,
    graduate: document.getElementById("graduate").value,
    batch: document.getElementById("batch").value,
    phone: phone,
  };

  try {

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Store submitted phone to prevent duplicates
    storeSubmittedPhone(phone);

    window.location.href = "success.html";
    form.reset();

  } catch (error) {

    successMessage.innerHTML =
      "❌ Something went wrong";

    successMessage.style.color = "#ffb3b3";

    // Re-enable button on error
    submitBtn.disabled = false;
    submitBtn.textContent = "Register";
    isSubmitting = false;
  }

});