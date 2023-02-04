class TicketManager {
    #profitBasePrice = 0.15;
    static id = 0;
    constructor(){
        this.events = [];
    }

    getEvents() {
        console.log(...this.events);
        return;
    }

    addEvent(name, place, price, capacity, date) {
        this.events.push({
            'id': TicketManager.id++,
            name,
            place,
            'price': price += price*this.#profitBasePrice,
            'capacity': capacity || 50,
            'date': date || new Date(),
            'participants': []
        })
        return;
    }

    addUser(eventId, userId) {
        const eventFound = this.events.find(event => event.id === eventId);
        eventFound.participants.some(user => user === userId)
            ? console.log('user already created')
            : eventFound.participants.push(userId);
        return;
    }

    newEventReleased(eventId, newPlace, newDate) {
        const newReleased = {...this.events.find(event => event.id === eventId)};
        newReleased.place = newPlace;
        newReleased.date = newDate;
        this.events.push(newReleased);
        return;
    }
}

newTicket = new TicketManager();
newTicket.addEvent('coldPlay', 'Buenos Aires',100, 30000,'23/03/2023');
newTicket.addEvent('coldPlay', 'Buenos Aires',100, '','');
newTicket.addUser(1,1);
newTicket.addUser(1,1);
newTicket.addUser(0,1);
newTicket.addUser(0,1);
newTicket.newEventReleased(0,'Rafaela','30/06/2023');
newTicket.getEvents();