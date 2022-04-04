const mongoose = require("mongoose");
// event has a name, date/time, description and photo
// we can add more later
const subSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  email: {
    type: String,
    required: [true, "Please add email to register"],
  }
});

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    eventName: {
      type: String,
      maxLength: [48, "Event name is to long"],
      required: [true, "Please write event name"],
    },
    dateTime: {
      type: Date,
      default: Date.now,
      required: [true, "Please add event date and time"],
    },
    eventDescription: {
      type: String,
      maxLength: [100, "Event description is too long"],
      required: [true, "Please write event description"],
    },
    eventPhoto: {
      type: String,
      required: [true, "Please provide a link to a photo"],
    },
    eventParticipants:[subSchema],
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model("Event", eventSchema);
