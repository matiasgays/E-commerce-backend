import ticketModel from "./models/ticket.model.js";

class Ticket {
  constructor() {}

  getTicketByCode = async (code) => {
    try {
      return await ticketModel.findOne({ code: code });
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  };

  createTicket = async (ticket) => {
    try {
      return await ticketModel.create(ticket);
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  };

  deleteAll = async () => {
    try {
      return await ticketModel.deleteMany({
        purchaser: "ing.matiasgays@gmail.com",
      });
    } catch (error) {
      throw new Error("Could not create ticket");
    }
  };
}

export default Ticket;
