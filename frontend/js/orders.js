const container = document.getElementById("orders");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function getOrders() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const orders = await response.json();

    container.innerHTML = "";

    if (orders.length === 0) {
      container.innerHTML = "<p>No orders found</p>";
      return;
    }

    orders.forEach((order) => {
      container.innerHTML += `
  <div class="order-card">

    <h3>📦 Order #${order._id.slice(-6)}</h3>

    <p><strong>Total Price:</strong> $${order.totalPrice}</p>

    <p>
      <strong>Status:</strong>
      <span class="order-status">
        ${order.status}
      </span>
    </p>

    <p>
      <strong>Date:</strong>
      ${new Date(order.createdAt).toLocaleDateString()}
    </p>

  </div>
`;
    });

  } catch (error) {
    console.log(error);
  }
}

getOrders();