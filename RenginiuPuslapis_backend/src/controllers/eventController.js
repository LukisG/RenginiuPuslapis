const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const getReqId = require("../utils/getReqID");

const throwCustomError = require("../utils/throwCustomError");
const {
  createEvent,
  getEventById,
  getAllEvents,
  getFilteredEvents,
  getUserEvents,
  updateEventById,
  deleteEventById,
  addParticipant,
} = require("../services/eventsServices");

// eslint-disable-next-line no-unused-vars
const createEventHandler = asyncHandler(async (req, res, next) => {
  const { user, eventName, dateTime, eventDescription, eventPhoto, eventParticipants } = req.body;

  if (!user || !eventName || !dateTime || !eventDescription || !eventPhoto) {
    throw throwCustomError("Please add all fields", 400);
  }

  console.log(eventParticipants);
  const newEvent = await createEvent(user, eventName, dateTime, eventDescription, eventPhoto, eventParticipants);

  res.status(201).json({
    status: "success",
    responseBody: {
      event: newEvent,
    },
  });
});

const getEventByIdHandler = asyncHandler(async (req, res) => {
  const eventId = mongoose.Types.ObjectId(getReqId(req));

  if (!ObjectId.isValid(eventId))
    throw throwCustomError("Please provide valid eventId", 400);

  const event = await getEventById(eventId);

  if(event)
  res.json({
    status: "success",
    responseBody: {
      event: event,
    },
  });
  else throw throwCustomError("Event not found", 404);
});

const getAllEventsHandler = asyncHandler(async (req, res) => {
  const events = await getAllEvents();

  res.json({
    status: "success",
    responseBody: {
      events,
    },
  });
});

const getFilteredEventsHandler = asyncHandler(async (req, res) => {
  const { eventName: eventNameQueryParam } = req.query;

  if (!eventNameQueryParam)
    throw throwCustomError(
      "Query parameter is wrong, please make sure you've typed it correctly",
      400);

  const filteredEvents = await getFilteredEvents(eventNameQueryParam);

  res.json({
    status: "success",
    responseBody: {
      filteredEvents,
    },
  });
});

const getUserEventsHandler = asyncHandler(async (req, res) => {
  const userId = mongoose.Types.ObjectId(getReqId(req));;

  if (!userId)
    throw throwCustomError("Please provide user id",400);

  const userEvents = await getUserEvents(userId);

  res.json({
    status: "success",
    responseBody: {
      userEvents,
    },
  });
});

const updateEventByIdHandler = asyncHandler(async (req, res) => {
  const eventId = mongoose.Types.ObjectId(getReqId(req));
  const { eventName, dateTime, eventDescription, eventPhoto, eventParticipants } = req.body;
  console.log(eventName, eventParticipants);
  if (!eventName && !dateTime && !eventDescription && !eventPhoto && !eventParticipants) {
    throw throwCustomError("Nothing to update", 400);
  }

  if (!ObjectId.isValid(eventId))
    throw throwCustomError("Please provide valid eventId", 400);

  const decodedUsersIdFromJwt = mongoose.Types.ObjectId(req.user.decodedId);

  const event = await getEventById(eventId);

  if(event.user.toString() == decodedUsersIdFromJwt.toString()){
    const eventUpdate = await updateEventById(eventId, eventName, dateTime, eventDescription, eventPhoto, eventParticipants);

    res.json({
      status: "success",
      responseBody: {
        event: eventUpdate,
      },
    });
  } else throw throwCustomError(
    "You're trying to update an event that isn't yours", 
    400);

});

const deleteEventByIdHandler = asyncHandler(async (req, res) => {
  const eventId = mongoose.Types.ObjectId(getReqId(req));

  if (!ObjectId.isValid(eventId))
    throw throwCustomError("Please provide valid eventId", 400);

  const decodedUsersIdFromJwt = mongoose.Types.ObjectId(req.user.decodedId);

  const event = await getEventById(eventId);
  
  if(!event) throw throwCustomError("Couldnt find event", 400);

  if(event.user.toString() == decodedUsersIdFromJwt.toString()){
    const eventDelete = await deleteEventById(eventId);

    res.json({
      status: "success",
      responseBody: {
        event: eventDelete,
      },
    });
  } else throw throwCustomError(
    "You're trying to delete an event that isn't yours", 
    400);
});

const addParticipantHandler = asyncHandler(async (req, res) => {
  const eventId = mongoose.Types.ObjectId(getReqId(req));
  const { userId, email } = req.body;

  if(!email) throw throwCustomError("Must provide email", 400);

  if (!ObjectId.isValid(eventId))
    throw throwCustomError("Please provide valid eventId", 400);

  const event = await addParticipant(eventId, userId, email);

  if(event)
  res.json({
    status: "success",
    responseBody: {
      event,
    },
  });
  else throw throwCustomError("Could not update event participants", 400);
});

module.exports = {
  createEventHandler,
  getEventByIdHandler,
  getAllEventsHandler,
  getFilteredEventsHandler,
  getUserEventsHandler,
  updateEventByIdHandler,
  deleteEventByIdHandler,
  addParticipantHandler,
};
