async function test() {
  try {
    console.log("hello");
    const response = await fetch("http://127.0.0.1:8080/api/order/");
    const responseJSON = await response.json();
    console.log(responseJSON.payload);
    const fragment = document.createDocumentFragment();
    responseJSON.payload.forEach((order) => {
      const div = document.createElement("div");
      const priceParagraph = document.createElement("p");
      const statusParagraph = document.createElement("p");
      const number = document.createElement("p");
      priceParagraph.innerHTML = `Total order : ${order.totalPrice}`;
      statusParagraph.innerHTML = `Status: ${order.status}`;
      number.innerHTML = `Order number: ${order.number}`;
      div.appendChild(number);
      div.appendChild(priceParagraph);
      div.appendChild(statusParagraph);
      fragment.append(div);
    });
    const ordersContainer = document.getElementById("orders");
    ordersContainer.appendChild(fragment);
  } catch (error) {
    throw new Error(error);
  }
}

window.onload = test();
