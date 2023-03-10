const getCurrentURL = () => {
  return window.location.href;
};

const getId = (url) => {
  const pid = url.split("/");
  return pid[pid.length - 1];
};

const fetchProductById = async (req, res) => {
  const product = document.getElementById("product");
  const url = getCurrentURL();
  const pid = getId(url);
  try {
    const serverRes = await fetch(`http://127.0.0.1:8080/api/products/${pid}`);
    const serverResJSON = await serverRes.json();
    const { title, description, price, thumbnail, category, stock } =
      serverResJSON.payload;
    product.innerHTML = `<main class="container">
                            <div class="left-column">
                              <img src=${thumbnail} alt="" />
                            </div>
                            <div class="right-column">
                              <div class="product-description">
                                <span>${category}</span>
                                <h1>${title}</h1>
                                <p>${description}</p>
                                <p>Stock: ${stock}</p>
                              </div>
                              <div class="product-price">
                                <span>$${price}</span>
                                <a href="#" class="cart-btn">Add to cart</a>
                              </div>
                            </div>
                          </main>`;
  } catch (error) {
    throw new Error(error);
  }
};

fetchProductById();
