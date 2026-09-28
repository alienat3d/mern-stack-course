// 3.0.1 Let's import "dotenv" as first here in our main file "server.js" and also add "config()" to it at the end and that will allow us to use "dotenv" throughout our app, we won't need it in every file. Of course, we'll also need to create a ".env" file containing the necessary environment variables. It needs to be located at the same level as "server.js." We must also add this file to the ".gitignore" file so that we don't accidentally upload and publish it.
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const {logger, logEvents} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
// 3.4.1 So, we'll import that "dbConn" and "mongoose" lib here. We'll also add the "logEvents" function that we've created earlier. ↓
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// 3.0.2 So, to pull out a value for an environment variable we can write "process.env.NAME_OF_VARIABLE". We'll add there also "DATABASE_URI" variable, which is the connection string to our database, that we'll get from mongodb.com after we create a new database for our project there.
// (Go to [notes/3-mongodb.md])
console.log(process.env.NODE_ENV, "mode");

// 3.4.2 And right at the top of file here we'll call "connectDB" function to connect our MongoDB database. ↓
connectDB();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({message: "404 Not Found"});
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// 3.4.3 And then, at very bottom we're going to wrap this "app.listen" method in a listener for the "mongoose.connection.once". And we'll listen for the "open" event as the first argument of it and as the second it'll be a callback function, where we put that "app.listen" at. But let's also display in the console a note that we're connected to MongoDB.
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// 3.4.4 But let's add another listener here, but instead of "once" we'll use "on" method here, which will be listening for "error" event. Then, we can pass that error to the callback function to display its message in console. But, as we've created the "logEvents" function, it's nice place to use it here. We'll be passing to it an error's number, code, system call and hostname. All of that should be provided through a MongoDB error. And as second argument we'll give a name to this log.
mongoose.connection.on("error", err => {
  console.error(err.message);
  // logEvents(`${err.errno}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongo-error-log.log");
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongo-error-log.log");
});