const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRouter");
const eventsRouter = require("./routes/eventsRouter");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // throw default error
  res
    .status(err.statusCode || 500)
    .json({ status: "error", responseBody: { message: err.message } });
});

module.exports = app;
