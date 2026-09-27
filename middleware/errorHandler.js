const {logEvents} = require("./logger");

// 2.4.0 We'll start out with importing our "logEvents" func that we've just created. And then, we'll create "errorHandler" middleware that is going to overwrite the default Express.js error handling. It'll accept error, request, response and next as the parameters.
const errorHandler = (err, req, res, next) => {
  // 2.4.1 We'll use "logEvents" function inside and pass in error's name and message, then it's a tab, and then it's just like the previous log events we were logging. And it will create another log file for that purpose "error-log.log". And let's also display in Node.js console "err.stack", which will be a pretty large message giving a lot of details about an error if it occurs and also tell us specifically where it is which can be very helpful.
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "error-log.log");

  console.log(err.stack);

  // 2.4.2 Then, we'll define status and this is going to see if we receive in the response a status code. If it does have that status code then we'll return it too, and if not we'll return status code 500 ("server error").
  const status = res.statusCode ? res.statusCode : 500;

  // 2.4.3 We'll set the status to whatever our ternary determined, and also we'll have a response that is JSON data with that error.
  // (Go to [server.js])
  res.status(status);

  res.json({message: err.message});
};

module.exports = errorHandler;