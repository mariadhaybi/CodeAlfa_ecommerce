async function loadCartCount() {
  const token = localStorage.getItem("token");
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  if (!token) {
    cartCount.style.display = "none";
    return;
  }

  try {
    const response = await fetch("https://codealfa-ecommerce-1.onrender.com/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("Failed to load cart count", response.status);
      return;
    }

    const cart = await response.json();
    console.log("CART DATA:", cart);

    const items = cart.items || [];
    let totalItems = 0;

    items.forEach((item) => {
      totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", loadCartCount);
window.loadCartCount = loadCartCount;