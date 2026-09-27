// 1.0.0 Let's start to create the main server file with defining Express.js by importing it with "require" and then assign it to "app".
const express = require("express");
const app = express();
const path = require("path");

// 1.0.1 Next, we'll need to create "PORT" that helps to set what port we are running our server on in development but also when we deploy it somewhere. So, here we'll get a "process.env.PORT" if the place we would deploy it would have a port number saved in the environment variables, then it would grab that. Otherwise, we'll run it locally at port 3500. ↓
const PORT = process.env.PORT || 3500;

// 1.1.0 Now, let's configure our server to provide us with some data. First, we need to import "path" so that we can give the server the paths to the folders and files we want it to serve. Then, we'll use the "use" method, which listens for the root route ("/"). As the second argument, we'll use "express.static", followed by "path.join", to pass the path to the "public" folder. This allows us to serve files from there. "__dirname" is the global variable that Node.js understands, that means "look inside the folder that where we in".
// 1.1.1 In the public folder we'll create "css" folder, although normally with REST API we're going to be receiving requests and sending back JSON data that would be requested, and we'll be receiving JSON data. However, a REST API can have a splash page, and it could also return information about requests that cannot be fulfilled, so we can at least set that much up as we start.
app.use("/", express.static(path.join(__dirname, "public")));

// 1.2 Let's use another "use" method here, and it will listen to the root route again, but then importing a root file. Of course, we have to create that file too.
// (Go to [routes/root.js])
app.use("/", require("./routes/root"));

// 1.3.0 We'll also need a "404 Error" page to inform users that the page they're requesting doesn't exist. Let's work on that, too. We want to put this after all the other routes and before the "listen" method. We'll use the "all" method for that, and as the "path" (the first argument), we'll use "*", which means "all the rest of the routes that haven't been matched yet".
app.all("*", (req, res) => {
  // 1.3.1 First of all, we'll send status code 404, although we're not sending a response yet.
  res.status(404);
  // 1.3.2 Then, we can look at the headers from the requests that come in and determine what type of response to send. So, if headers is html, then we can send "404.html", for "json" or "txt" we'll be sending just messages "404 Not Found" by now.
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({message: "404 Not Found"});
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// 1.0.2 We'll instruct our app to start listening using the "listen" method, which accepts the "PORT" and an anonymous function as arguments. That function will log a message to the console indicating on which port our server is currently running. ↑
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));