import ticketModel from "./models/ticket.model.js";

class Ticket {
  constructor() {}

  getTicketByCode = async (code) => {
    try {
      const mongoRes = await ticketModel.findOne({ code: code });
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  createTicket = async (ticket) => {
    try {
      const mongoRes = await ticketModel.create(ticket);
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };

  deleteAll = async () => {
    try {
      const mongoRes = await ticketModel.deleteMany({
        purchaser: "ing.matiasgays@gmail.com",
      });
      return { payload: mongoRes };
    } catch (error) {
      return { code: 500, payload: error };
    }
  };
}

export default Ticket;
