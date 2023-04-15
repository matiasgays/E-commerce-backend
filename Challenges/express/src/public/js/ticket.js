const createTicket = async () => {
  const ticket = document.getElementById("ticket");
  const url = getCurrentURL();
  const cid = getCartId(url);
  const ticketCode = getTicketCode(url);
  try {
    const newTicket = await fetch(
      `http://127.0.0.1:8080/api/cart/${cid}/purchase/${ticketCode}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ codeNumber: ticketCode }),
      }
    );
    const newTicketJSON = await newTicket.json();
    const { code, purchase_datetime, amount, purchaser } =
      newTicketJSON.payload;
    return (ticket.innerHTML = `
                            <div class="Ticket-Container">
                                <h3 class="code">Code: ${code}</h1>
                                <h3 class="purchase_datetime">Purchase DateTime: ${purchase_datetime}</h2>
                                <h3 class="amount">Amount: ${amount}</h3>
                                <h3 class="purchaser">Purchaser Email: ${purchaser}</h3>
                            </div>
                                `);
  } catch (error) {
    throw new Error(error);
  }
};

const getCurrentURL = () => {
  return window.location.href;
};

const getCartId = (url) => {
  const ticket = url.split("/");
  return ticket[ticket.length - 3];
};

const getTicketCode = (url) => {
  const ticket = url.split("/");
  return ticket[ticket.length - 1];
};

createTicket();
