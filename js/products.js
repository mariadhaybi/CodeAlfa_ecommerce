const API_URL = "https://codealfa-ecommerce-1.onrender.com/api/products";
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

async function getProducts() {
  try {
    const response = await fetch(API_URL);

    const products = await response.json();

    const productsContainer = document.getElementById("products");

    products.forEach((product) => {
      productsContainer.innerHTML += `
        <div class="product">

         <img src="${product.image}" />
         
          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <p>$${product.price}</p>

          <a href="product.html?id=${product._id}">
          View Details
          </a>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

getProducts();
