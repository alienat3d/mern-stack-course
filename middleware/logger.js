// 2.2.1 We need to install two libraries "uuid" & "date-fns" as well. And we'll destructure "format" function fron the "date-fns" library right away. We'll destructure also "v4: uuid" from "uuid" library.
const {format} = require("date-fns");
const {v4: uuid} = require("uuid");

// 2.2.2 We would need also "fs" for the filesystem, that is built-in in Node.js.
const fs = require("fs");
// 2.2.3 And let's create another one with Promises as well.
const fsPromises = require("fs").promises;

// 2.2.4 Of course, we'll also need that "path" module again here for the paths.
const path = require("path");

// 2.2.5 Okay, after everything is imported we're ready for creating a helper function "logEvents", that accepts two parameters. So, inside that function we'll create "dateTime" to create and format the timestamps for our logs. And then we'll create "logItem" to form the log itself. Notice there is "/t" those are tabs and not only create space between pieces of the log, but also make easy to import into Excel or similar sheets. We'll use "uuid" library here to create a unique ID for each log, which might be handy as well if we were to export that. The last "\n" will create a new line.
const logEvents = async (message, logFilename) => {
  const dateTime = format(new Date(), "yyyy.MM.dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    // 2.2.6 Here we need to check if the folder "logs" doesn't exit, then we'll be creating that.
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // 2.2.7 Then, we need use "fsPromises" to create/update a log file in that "logs" folder, and besides the path we also have to add the filename from parameter. And then we also need to specify the "logItem".
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFilename), logItem);
  } catch (err) {
    console.log(err);
  }
};

// 2.3.0 Okay, after that we'll need to write an actual middleware here that accepts request, response and "next" parameter to have an ability to call "next" function, so it can give a command to move to the next piece of middleware. And inside we'll put in "logEvents" function, and it accepts as first argument a message, formed of request method, request URL and the origin, which what the URL where the request originated from. Second argument is the filename of the file we're writing log to.
// todo: So, this would log every request that comes in, and you might want to put some conditionals in there that says something like "log it only if it's coming from our own URL or only specific request methods. Because this would get full very fast if we left it like this for entire app. But we won't do that by now and leave it for later to improve.
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "request-log.log");

  // 2.3.1 Let's also logging request method and request path to the console, which could help us during development.
  console.log(`${req.method} ${req.path}`);

  // 2.3.2 At the end of this middleware we just call "next", so it moves on to the next piece of middleware or eventually the controller where the request would be processed. The "logger", of course, would come first.
  next();
};

// 2.3.3 We want to export them both.
// (Go to [server.js])
module.exports = {logEvents, logger};