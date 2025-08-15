// Products list (use your products.json or inline here)
const products = [
  { id: 1, name: "Oversized Hoodie", price: 499, image: "images/hoodie1.jpg", category: "hoodie" },
  { id: 2, name: "Classic Black Hoodie", price: 450, image: "images/hoodie2.jpg", category: "hoodie" },
  { id: 3, name: "Zip-up Hoodie", price: 520, image: "images/hoodie3.jpg", category: "hoodie" },
  { id: 4, name: "Graphic T-Shirt", price: 299, image: "images/tshirt1.jpg", category: "tshirt" },
  { id: 5, name: "Plain White T-Shirt", price: 199, image: "images/tshirt2.jpg", category: "tshirt" },
  { id: 6, name: "Striped T-Shirt", price: 250, image: "images/tshirt3.jpg", category: "tshirt" },
  { id: 7, name: "Slim Fit Jeans", price: 699, image: "images/jeans1.jpg", category: "jeans" },
  { id: 8, name: "Ripped Denim Jeans", price: 749, image: "images/jeans2.jpg", category: "jeans" },
  { id: 9, name: "Dark Wash Jeans", price: 720, image: "images/jeans3.jpg", category: "jeans" },
  { id: 10, name: "Classic Sneakers", price: 899, image: "images/sneakers1.jpg", category: "sneakers" },
  { id: 11, name: "Running Sneakers", price: 1100, image: "images/sneakers2.jpg", category: "sneakers" },
  { id: 12, name: "Casual Sneakers", price: 950, image: "images/sneakers3.jpg", category: "sneakers" },
  { id: 13, name: "Leather Jacket", price: 1500, image: "images/jacket1.jpg", category: "jacket" },
  { id: 14, name: "Denim Jacket", price: 1300, image: "images/jacket2.jpg", category: "jacket" },
  { id: 15, name: "Bomber Jacket", price: 1400, image: "images/jacket3.jpg", category: "jacket" },
  { id: 16, name: "Cargo Shorts", price: 399, image: "images/shorts1.jpg", category: "shorts" },
  { id: 17, name: "Denim Shorts", price: 450, image: "images/shorts2.jpg", category: "shorts" },
  { id: 18, name: "Casual Shorts", price: 380, image: "images/shorts3.jpg", category: "shorts" },
  { id: 19, name: "Chinos Pants", price: 700, image: "images/pants1.jpg", category: "pants" },
  { id: 20, name: "Slim Fit Pants", price: 730, image: "images/pants2.jpg", category: "pants" },
  { id: 21, name: "Track Pants", price: 600, image: "images/pants3.jpg", category: "pants" },
  { id: 22, name: "Baseball Cap", price: 180, image: "images/accessories1.jpg", category: "accessories" },
  { id: 23, name: "Beanie Hat", price: 150, image: "images/accessories2.jpg", category: "accessories" },
  { id: 24, name: "Leather Belt", price: 250, image: "images/accessories3.jpg", category: "accessories" },
  { id: 25, name: "Sport Watch", price: 999, image: "images/accessories4.jpg", category: "accessories" },
  { id: 26, name: "Aviator Sunglasses", price: 800, image: "images/accessories5.jpg", category: "accessories" },
  { id: 27, name: "Classic Polo Shirt", price: 350, image: "images/tshirt4.jpg", category: "tshirt" },
  { id: 28, name: "Pullover Sweater", price: 600, image: "images/hoodie4.jpg", category: "hoodie" },
  { id: 29, name: "Running Shorts", price: 420, image: "images/shorts4.jpg", category: "shorts" },
  { id: 30, name: "Denim Overalls", price: 850, image: "images/pants4.jpg", category: "pants" }
];

const shop = document.querySelector(".products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartCountBadge = document.getElementById("cart-count-badge");
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");

let cart = [];

// Save and load cart from localStorage so it persists on page changes
function saveCart() {
  localStorage.setItem("shopetizeCart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("shopetizeCart");
  if (saved) {
    cart = JSON.parse(saved);
  }
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} - R${item.price} <button onclick="removeFromCart(${index})" aria-label="Remove ${item.name} from cart">Remove</button></p>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });
  cartTotal.innerText = `Total: R${total}`;
  cartCount.innerText = cart.length;
  if(cartCountBadge) cartCountBadge.innerText = cart.length;

  saveCart();
  renderPayPalButton(total);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Shuffle products array - Fisher-Yates algorithm
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderProducts(productList) {
  if (!shop) return;
  shop.innerHTML = "";
  productList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;
    // Hover effect using JS (optional, CSS handles most)
    div.addEventListener("mouseenter", () => {
      div.style.transform = "translateY(-8px)";
      div.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "translateY(0)";
      div.style.boxShadow = "0 3px 6px rgba(0,0,0,0.1)";
    });
    shop.appendChild(div);
  });
}

// Filtering function (only used on product.html)
function filterProducts() {
  if (!searchBar || !categoryFilter) return;

  const searchTerm = searchBar.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter(product => {
    return (
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm)
    );
  });
  renderProducts(filtered);
}

// PayPal button rendering
function renderPayPalButton(total) {
  const container = document.getElementById("paypal-button-container");
  if (!container) return;

  container.innerHTML = "";
  if (total === 0) return;

  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{ amount: { value: total.toFixed(2) } }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(details => {
        alert(`Thanks, ${details.payer.name.given_name}! Your order is confirmed.`);
        cart = [];
        updateCart();
      });
    }
  }).render("#paypal-button-container");
}

function init() {
  loadCart();
  updateCart();

  // Determine if home page or product page by presence of filters
  if (searchBar && categoryFilter) {
    // Product page: full list + filters
    renderProducts(products);
    searchBar.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
  } else {
    // Home page: show 6 random featured products only
    const featured = shuffleArray(products).slice(0, 6);
    renderProducts(featured);
  }
}

window.addEventListener("DOMContentLoaded", init);

// Expose addToCart and removeFromCart globally for buttons
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

