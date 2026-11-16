const eventRepository = require("../repositories/eventRepository");
const eventCache = require("../config/cache");

// Display all events
exports.getAllEvents = async (req, res, next) => {
    try {
        // Check whether the events are already cached
        let events = eventCache.get("events");

        // If there is no cached data, fetch events from the database
        if (!events) {
            events = await eventRepository.findAll();

            // Store the events in the cache
            eventCache.set("events", events);
        }

        res.render("events/index", {
            title: "All Events",
            events
        });
    } catch (error) {
        next(error);
    }
};

// Display one event
exports.getEventById = async (req, res, next) => {
    try {
        const event = await eventRepository.findById(req.params.id);

        if (!event) {
            return res.status(404).render("error", {
                title: "Event Not Found",
                message: "The event you are looking for does not exist."
            });
        }

        res.render("events/show", {
            title: event.title,
            event
        });
    } catch (error) {
        next(error);
    }
};

// Display the form for creating an event
exports.getNewEventForm = (req, res) => {

    res.render("events/new", {
        title: "Create New Event"
    });
};


// Save a new event to the database
exports.createEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, isActive } = req.body;

        // Check that required fields are not empty
        if (!title || !title.trim() ||
            !description || !description.trim() ||
            !date || !location || !location.trim()) {
            return res.status(400).render("events/new", {
                title: "Create New Event",
                error: "Please complete all required fields."
            });
        }

        await eventRepository.create({
            title: title.trim(),
            description: description.trim(),
            date,
            location: location.trim(),
            isActive: isActive === "true"
        });

        eventCache.clear("events");

        res.redirect("/events");
    } catch (error) {
        next(error);
    }
};


// Display the form for editing an event
exports.getEditEventForm = async (req, res, next) => {
    try {
        const event = await eventRepository.findById(req.params.id);

        if (!event) {
            return res.status(404).render("error", {
                title: "Event Not Found",
                message: "The event you are trying to edit does not exist."
            });
        }

        res.render("events/edit", {
            title: "Edit Event",
            event
        });
    } catch (error) {
        next(error);
    }
};


// Update an existing event
exports.updateEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, isActive } = req.body;

        const event = await eventRepository.findById(req.params.id);

        if (!event) {
            return res.status(404).render("error", {
                title: "Event Not Found",
                message: "The event you are trying to update does not exist."
            });
        }

        // Check that required fields are not empty
        if (!title || !title.trim() ||
            !description || !description.trim() ||
            !date || !location || !location.trim()) {
            return res.status(400).render("events/edit", {
                title: "Edit Event",
                event,
                error: "Please complete all required fields."
            });
        }

        await eventRepository.update(req.params.id, {
            title: title.trim(),
            description: description.trim(),
            date,
            location: location.trim(),
            isActive: isActive === "true"
        });

        eventCache.clear("events");

        res.redirect(`/events/${req.params.id}`);
    } catch (error) {
        next(error);
    }
};


// Delete an existing event
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await eventRepository.findById(req.params.id);

        if (!event) {
            return res.status(404).render("error", {
                title: "Event Not Found",
                message: "The event you are trying to delete does not exist."
            });
        }

        await eventRepository.delete(req.params.id);

        eventCache.clear("events");

        res.redirect("/events");
    } catch (error) {
        next(error);
    }
};