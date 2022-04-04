const throwCustomError = require("./throwCustomError");
// quick function to return id of type string no matter where its sent to
// the expected params is id
module.exports = (req) => {
  if (req.body.id !== undefined && req.body.id !== "") 
    return req.body.id;
  else if (req.params.id !== undefined && req.params.id !== "")
    return req.params.id.toString().replace(":", "");
  else
    throw throwCustomError(
      "ID is required. Send ID by req.params or req.body.id",
      400
    );
};
