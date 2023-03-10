const getCurrentURL = () => {
  return window.location.href;
};

const getCartId = (url) => {
  const cid = url.split("/");
  return cid[cid.length - 1];
};

const fetchCartById = async (req, res) => {
  const cart = document.getElementById("cart");
  const url = getCurrentURL();
  const cid = getCartId(url);
  try {
    const serverRes = await fetch(`http://127.0.0.1:8080/api/cart/${cid}`);
    const serverResJSON = await serverRes.json();
    console.log(serverResJSON.payload[0].products);
    cart.innerHTML = serverResJSON.payload[0].products.map((product) => {
      return `
                            <div class="Cart-Container">
                                <div class="Header">
                                <h3 class="Heading">Shopping Cart</h3>
                                <h5 class="Action">Remove all</h5>
                                </div>
                                <div class="Cart-Items">
                                <div class="about">
                                    <h1 class="title">${product.product.title}</h1>
                                    <h2 class="subtitle">${product.product.description}</h2>
                                    <h3 class="h3">${product.product.category}</h3>
                                </div>
                                <div class="counter">
                                    <div class="btn">+</div>
                                    <div class="count">${product.quantity}</div>
                                    <div class="btn">-</div>
                                </div>
                                <div class="prices">
                                    <div class="amount">$${product.product.price}</div>
                                    <div class="remove"><u>Remove</u></div>
                                </div>
                                </div>
                                <hr />
                                `;
    });
  } catch (error) {
    throw new Error(error);
  }
};

fetchCartById();
