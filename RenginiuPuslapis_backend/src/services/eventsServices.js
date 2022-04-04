const EventModel = require("../models/eventModel");
const throwCustomError = require("../utils/throwCustomError");

const createEvent = async (
  user,
  eventName,
  dateTime,
  eventDescription,
  eventPhoto,
  eventParticipants
) => {

  const newEvent = new EventModel({
    user,
    eventName,
    dateTime,
    eventDescription,
    eventPhoto,
    eventParticipants,
  });
  await newEvent.save();

  return newEvent;

};

const getEventById = async (eventId) => {
  const event = await EventModel.findById(eventId).exec();

  return event;
};

const getAllEvents = async () => {
  const events = await (
    await EventModel.find({}).exec()
  ).map((doc) => doc._doc);

  return events;
};

const getFilteredEvents = async (eventNameQueryParam) => {
  const re = new RegExp(eventNameQueryParam, "i");

  let filteredEvents = await EventModel.find({ eventName: re }).exec();

  filteredEvents = filteredEvents.map((doc) => doc._doc);

  return filteredEvents;
};

const getUserEvents = async (userId) => {
  const events = await (
    await EventModel.find({user: userId}).exec()
  ).map((doc) => doc._doc);

  return events;
}

const updateEventById = async (eventId, eventName, dateTime, eventDescription, eventPhoto) => {
  // we do it seperatly so we dont change something we dont want to
  if (eventName) {
    await EventModel.findByIdAndUpdate(eventId, { eventName: eventName });
  }
  if (dateTime) {
    await EventModel.findByIdAndUpdate(eventId, { dateTime: dateTime });
  }
  if (eventDescription) {
    await EventModel.findByIdAndUpdate(eventId, { eventDescription: eventDescription });
  }
  if (eventPhoto) {
    await EventModel.findByIdAndUpdate(eventId, { eventPhoto: eventPhoto });
  }

  const updatedEvent = await EventModel.findById(eventId);

  return updatedEvent;
};

//delete event
const deleteEventById = async (eventId) => {
  const eventDelete = await EventModel.findByIdAndDelete(eventId).exec();

  return eventDelete;
};

const addParticipant = async (eventId, userId, email) => {
  const event = await EventModel.findById(eventId).exec();

  if(!event) throw throwCustomError("Event not found", 400);

  const participant = event.eventParticipants.find(participant => {
    return participant.email === email;
  });

  if(participant !== undefined) throw throwCustomError("You are already registered", 400);

  event.eventParticipants.push({userId: userId, email: email});

  event.save(function (err) {
    if (err) throw throwCustomError(err.message, 400);
    else
    console.log('Success!');
  });

  return event;

}

module.exports = { createEvent, getEventById, getAllEvents, getFilteredEvents, getUserEvents, updateEventById, deleteEventById, addParticipant, };
