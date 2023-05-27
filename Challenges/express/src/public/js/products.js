const socket = io();
const std = document.getElementById("products");
const currentPage = document.getElementById("page");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const addToCart = document.getElementById("addToCart");
let user;
const API = "http://localhost:8080/";
const API_PRODUCTS = "http://localhost:8080/api/products";
const API_CART = "http://localhost:8080/api/cart";
const logout = document.getElementById("logout");

getProductsList();

nextPage.addEventListener("click", () => {
  const params = getParams(getCurrentURL());
  if (params.page) params.page++;
  else params.page = 2;
  const query = convertParamsToQuery(params);
  window.location.href = API + query;
});

prevPage.addEventListener("click", () => {
  const params = getParams(getCurrentURL());
  params.page--;
  const query = convertParamsToQuery(params);
  window.location.href = API + query;
});

logout.addEventListener("click", async () => {
  await fetch("/login/logout", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });
  window.location.href = "/login";
});

async function getProductsList() {
  const params = getParams(getCurrentURL());
  const query = convertParamsToQuery(params);
  try {
    return await fetchProducts(API_PRODUCTS + query);
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchProducts(url) {
  try {
    const serverRes = await fetch(url);
    const serverResJSON = await serverRes.json();
    const productsList = document.getElementById("products");
    productsList.innerHTML = serverResJSON.payload.docs.map((product) => {
      return `<div class="card">
                <img src="${product.thumbnail}" style="width:10%">
                <h1>${product.title}</h1>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
                <a href="#" class="anchor" id=${product._id}>See more...</a>
                <p><button href="#" id=${product._id} class="btn">Add to Cart</button></p>
              </div>`;
    });
    currentPage.innerHTML = serverResJSON.payload.page;
    handleNextButton(serverResJSON.payload);
    handlePrevButton(serverResJSON.payload);
    handleAnchors();
    handleAddToCartButtons();
  } catch (error) {
    throw new Error(error);
  }
}

function getParams(url) {
  const params = {};
  let paramString = url.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  for (let [key, value] of queryString.entries()) {
    params[key] = value;
  }
  return params;
}

function getCurrentURL() {
  return window.location.href;
}

function convertParamsToQuery(params) {
  let query = "?";
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      query += `${key}=${params[key]}&`;
    }
  }
  return query;
}

function handleNextButton(data) {
  data.hasNextPage === false
    ? (nextPage.disabled = true)
    : (nextPage.disabled = false);
}

function handlePrevButton(data) {
  data.hasPrevPage === false
    ? (prevPage.disabled = true)
    : (prevPage.disabled = false);
}

function handleAnchors() {
  const anchors = document.querySelectorAll(".anchor");
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.id;
      window.location.href = "/product" + `/${id}`;
    });
  });
}

function handleAddToCartButtons() {
  const cid = "63e7eb12143d3b6edf063115";
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.id;
      const endpoint = `/${cid}/product/${id}`;
      try {
        const serverRes = await fetch(API_CART + endpoint, {
          method: "POST",
          headers: { "Content-type": "application/json;charset=UTF-8" },
          body: JSON.stringify({ role: "user" }),
        });
        if (serverRes.status === 200) {
          alert(`Product added successfully to cart _id: ${cid}`);
        } else {
          alert("User's role not authorized");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  });
}
