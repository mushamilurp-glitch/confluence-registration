// script.js
console.log("Script Connected");
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

/*
Replace this URL later
with your Google Apps Script Web App URL
*/

const scriptURL = "https://script.google.com/macros/s/AKfycbx3x0yleTCSBCPIug96DZAa8g_cdAMXhPUmsvrr_dZSuiryFsZaA9DZ9fHDqOZx34xg/exec";

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    course: document.getElementById("course").value,
    graduate: document.getElementById("graduate").value,
    batch: document.getElementById("batch").value,
    phone: document.getElementById("phone").value,
  };

  try {

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    window.location.href = "success.html";
    form.reset();

  } catch (error) {

    successMessage.innerHTML =
      "❌ Something went wrong";

    successMessage.style.color = "#ffb3b3";
  }

});