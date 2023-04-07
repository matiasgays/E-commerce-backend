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
    const current = await fetch(`http://127.0.0.1:8080/api/cart/${cid}/json`);
    const currentCart = await current.json();
    cart.innerHTML = currentCart.payload[0].products.map((product) => {
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

const createTicket = () => {
  const checkout = document.getElementById("checkout");
  checkout.addEventListener("click", async () => {
    try {
      const url = getCurrentURL();
      const cid = getCartId(url);
      const cart = await fetch(`http://127.0.0.1:8080/api/cart/${cid}/json`);
      const { payload } = await cart.json();
      const ticket = await fetch(
        `http://127.0.0.1:8080/api/cart/${cid}/purchase`,
        {
          method: "POST",
          headers: { "Content-type": "application/json;charset=UTF-8" },
          body: JSON.stringify(payload),
        }
      );
      const ticketJSON = await ticket.json();
      const { code } = ticketJSON.payload;
      if (ticket.status === 200) {
        window.location.href = `/api/cart/${cid}/purchase/${code}`;
      } else {
        window.location.href = `/api/cart/${cid}`;
      }
    } catch (error) {
      throw new Error(error);
    }
  });
};

fetchCartById();
createTicket();
