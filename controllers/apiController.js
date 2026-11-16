const eventRepository = require("../repositories/eventRepository");

// Return all events as JSON
exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await eventRepository.findAll();

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        next(error);
    }
};