const API_URL = "http://localhost:5000/api/products";

// استخراج id من الرابط
const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function getProduct() {
  try {
    const response = await fetch(`${API_URL}/${productId}`);

    const product = await response.json();

    const container = document.getElementById("product");

    container.innerHTML = `
  <img src="${product.image}" class="product-image">

  <h2>${product.name}</h2>

  <p>${product.description}</p>

  <p>Price: $${product.price}</p>

  <p>Stock: ${product.stock}</p>

  <button id="addToCartBtn">
    Add To Cart
  </button>
`;

    const addToCartBtn = document.getElementById("addToCartBtn");

    addToCartBtn.addEventListener("click", addToCart);
  } catch (error) {
    console.log(error);
  }
}

getProduct();

async function addToCart() {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    });

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("DATA:", data);

    alert("Product added to cart");

    if (typeof window.loadCartCount === "function") {
      window.loadCartCount();
    }
  } catch (error) {
    console.log(error);
  }
}
