import ticketModel from "./models/ticket.model.js";

class Ticket {
  constructor() {}

  getTicketByCode = async (code) => {
    try {
      const mongoRes = await ticketModel.findOne({ code: code });
      return { payload: mongoRes };
    } catch (error) {
      return { error };
    }
  };

  createTicket = async (ticket) => {
    try {
      const mongoRes = await ticketModel.create(ticket);
      return { payload: mongoRes };
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  };

  deleteAll = async () => {
    try {
      const mongoRes = await ticketModel.deleteMany({
        purchaser: "ing.matiasgays@gmail.com",
      });
      return { payload: mongoRes };
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  };
}

export default Ticket;
