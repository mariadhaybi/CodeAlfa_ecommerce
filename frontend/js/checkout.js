const form = document.getElementById("checkoutForm");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

form.addEventListener("submit", placeOrder);

async function placeOrder(e) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("https://codealfa-ecommerce-1.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);

    alert("Order placed successfully!");

    setTimeout(() => {
      window.location.href = "orders.html";
    }, 500);

  } catch (error) {
    console.log(error);
  }
}