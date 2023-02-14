const socket = io();
const std = document.getElementById("products");
const currentPage = document.getElementById("page");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const addToCart = document.getElementById("addToCart");
let user;

socket.on("products", (products) => {
  let messages = "";
  products.docs.forEach((product) => {
    messages =
      messages +
      `Title: ${product.title} - Description: ${product.description} - Price:${product.price}</br>`;
  });
  std.innerHTML = messages;
  currentPage.innerHTML = products.page;
  products.hasPrevPage === false
    ? (prevPage.disabled = true)
    : (prevPage.disabled = false);

  products.hasNextPage === false
    ? (nextPage.disabled = true)
    : (nextPage.disabled = false);
});

socket.on("error", () => {
  actualPage.append("cannot go to prev page");
});

nextPage.addEventListener("click", () => {
  socket.emit("nextPage");
});

prevPage.addEventListener("click", () => {
  socket.emit("prevPage");
});
