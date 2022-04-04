const express = require("express");
const router = express.Router();
const {
  createEventHandler,
  getEventByIdHandler,
  getAllEventsHandler,
  getFilteredEventsHandler,
  getUserEventsHandler,
  updateEventByIdHandler,
  deleteEventByIdHandler,
  addParticipantHandler,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

// GET /api/events -> GETS ALL EVENTS
router.get("/", getAllEventsHandler);

// GET /api/events/event/:eventId -> GETS EVENT BY ID
router.get("/event/:id", getEventByIdHandler);

// GET /api/events/event/?eventName=example -> ( query params: eventName ) ->  GETS EVENTS FILTERED BY EVENTNAME query param
router.get("/event", getFilteredEventsHandler);

// Only a registered user (user with a token) can make events

// POST /api/events/event -> auth -> CREATES EVENT -> ( request body: json: user, eventName, dateTime, eventDescription, eventPhoto )
router.post("/event", protect, createEventHandler);

// GET /api/events/user/:userId -> GETS USER OWNED EVENTS
router.get('/event/user/:id', getUserEventsHandler);

router.patch("/event/:id/update", protect, updateEventByIdHandler);

router.delete("/event/:id/delete", protect, deleteEventByIdHandler);

router.post("/event/:id/participant", addParticipantHandler);

module.exports = router;
