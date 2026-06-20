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
    const IMAGE_URL = "https://codealfa-ecommerce-1.onrender.com/uploads/";

    function getImageSrc(image) {
      if (!image) return "";
      if (image.startsWith("http://localhost:") || image.startsWith("https://localhost:")) {
        const cleanImage = image.replace(/^https?:\/\/localhost:\d+\/?/, "");
        return `${IMAGE_URL}${cleanImage.replace(/^\/?uploads\//, "")}`;
      }
      if (image.startsWith("http://")) {
        return image.replace(/^http:\/\//, "https://");
      }
      if (image.startsWith("https://")) return image;
      const cleanImage = image.replace(/^\/?uploads\//, "");
      return `${IMAGE_URL}${cleanImage}`;
    }

    products.forEach((product) => {
      const imageSrc = getImageSrc(product.image);
      productsContainer.innerHTML += `
        <div class="product">

          <img src="${imageSrc}" alt="${product.name}" />
         
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
