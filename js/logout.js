document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginLink) {
    loginLink.style.display = token ? "none" : "inline-block";
  }

  if (logoutBtn) {
    logoutBtn.style.display = token ? "inline-block" : "none";

    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
      alert("You logged out successfully");
      window.location.href = "login.html";
    });
  }
});