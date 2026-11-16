const Event = require("../models/Event");

const eventRepository = {
    // Retrieve all events
    findAll() {
        return Event.findAll({
            order: [["date", "ASC"]]
        });
    },

    // Retrieve one event by its ID
    findById(id) {
        return Event.findByPk(id);
    },

    // Create a new event
    create(eventData) {
        return Event.create(eventData);
    },

    // Update an existing event
    update(id, eventData) {
        return Event.update(eventData, {
            where: { eventId: id }
        });
    },

    // Delete an event
    delete(id) {
        return Event.destroy({
            where: { eventId: id }
        });
    }
};

module.exports = eventRepository;  