const API_URL = "https://codealfa-ecommerce-1.onrender.com/api/cart";
const token = localStorage.getItem("token");
window.onload = () => {
  const token = localStorage.getItem("token");

  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginLink && logoutBtn) {
    if (token) {
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline";
    } else {
      loginLink.style.display = "inline";
      logoutBtn.style.display = "none";
    }
  }
};


if (!token) {
  window.location.href = "login.html";
}
console.log("TOKEN:", localStorage.getItem("token"));


async function getCart() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("cart").innerHTML = "Please login first";
      return;
    }

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store"
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      document.getElementById("cart").innerHTML =
        '<p>Session expired. <a href="login.html">Login again</a>.</p>';
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to load cart (${response.status})`);
    }

    const data = await response.json();

    const container = document.getElementById("cart");

    container.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      container.innerHTML = "<p>Cart is empty</p>";
      return;
    }

    let total = 0;

    data.items.forEach((item) => {
      if (!item.product) return;

      total += item.product.price * item.quantity;

      container.innerHTML += `
        <div class="cart-item">

          <img src="${item.product.image}" width="100">

          <div>

            <h3>${item.product.name}</h3>

            <p>${item.product.description}</p>

            <p>Price: $${item.product.price}</p>

            <div>
          <button onclick="updateQty('${item.product._id}', 'decrease')">-</button>

          <span>${item.quantity}</span>
  
          <button onclick="updateQty('${item.product._id}', 'increase')">+</button>
           </div>

            <button onclick="removeFromCart('${item.product._id}')">
              Remove
            </button>

          </div>

        </div>
      `;
    });

    container.innerHTML += `
      <div class="cart-total">
        <h2>Total: $${total}</h2>
      </div>
    `;
    container.innerHTML += `
    <button
     onclick="window.location.href='checkout.html'"
     id="checkoutBtn"
     >
     Checkout
     </button>
`;
  } catch (error) {
    console.log(error);
  }
}

getCart();

async function removeFromCart(productId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`https://codealfa-ecommerce-1.onrender.com/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to remove item (${response.status})`);
    }

    alert("Removed from cart");
    getCart();
    if (typeof window.loadCartCount === "function") {
      window.loadCartCount();
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateQty(productId, action) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`https://codealfa-ecommerce-1.onrender.com/api/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: action, // "increase" أو "decrease"
      }),
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      throw new Error(`Failed to update quantity (${response.status})`);
    }

    getCart();
    if (typeof window.loadCartCount === "function") {
      window.loadCartCount();
    }
  } catch (error) {
    console.log(error);
  }
}
