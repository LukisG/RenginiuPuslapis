const UserModel = require("../models/userModel");
const EventModel = require('../models/eventModel');

const deleteUser = async (userId) => {
  await EventModel.deleteMany({user: userId});
  let existingUser = await UserModel.findByIdAndDelete(userId);
  
  return existingUser._doc;
};

module.exports = { deleteUser };
