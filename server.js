const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const {logger} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

// 2.3.4 And then we import our custom middleware here and want to run it before anything else. Okay, after testing it works as it should let's go ahead and create one more piece of custom middleware "errorHandler".
// (Go to [middleware/errorHandler.js])
app.use(logger);

// 2.1 Let's add another one and this built-in middleware "express.json" adds the ability to process JSON in our app. It'll receive and parse JSON data and that what we're going to use.
app.use(express.json());

// 2.5 Before we start testing again, let's add 3rd party middleware as well. We'll need to install "cookie-parser" for that. As our REST API is going to need to be able to parse cookies, and that's because we're going to use them in this MERN app. So, we'll import that "cookie-parser" library here. And it's actually about as easy as apply built-in "express.json" middleware.
app.use(cookieParser());

// ? 2.6.0 Okay, that was one easy 3rd party middleware, but I want to add another one that is a little more complicate, but must be added (or at least taken in consideration to be added) every time you create a REST API. I'm talking about CORS ("Cross-Origin Resource Sharing") and it is a security mechanism implemented by web browsers that allows a web page from one origin (domain, protocol, or port) to request and access resources from a server on a different origin. By default, browsers enforce a policy called the Same-Origin Policy. This prevents malicious websites from reading sensitive data from another site (like your bank account or email) without permission. However, modern web apps frequently need to load assets or fetch APIs from separate domains (e.g., a frontend app hosted on app.com fetching data from an API at api.com). CORS provides a secure way to grant that permission via specific HTTP headers (such as Access-Control-Allow-Origin).
// 2.6.1 So, let's add and do that as if we were creating a public API first, and then we'll secure it afterward. It's actually very easy to se if it were a public API: we'll install "cors" package, and we'll import it here, so that we can use it.
// 2.6.2 So, right after we added that middleware our server is available to the other resources as public API without a "CORS error". But we actually want to make it private, so we'll secure it and only allow the origins we want to access it. And we'll need to create CORS options for that and two more files inside the "config" folder as well.
// (Go to [config/allowedOrigins.js])
// 2.6.9 Then, to apply "corsOptions" to "cors" middleware we simply pass them in. So now, if for test we're going anywhere except those URLs in the "allowedOrigins" list, say to google.com and input in the console "fetch("http://localhost:3500");" there, we'll see the CORS error, as it supposed to be, as "google.com" is not on the list to get access to our API. But what else happened is that now our server also created "error-log.log" file and has a record about that CORS-error just happened.
app.use(cors(corsOptions));

// ? 2.2.0 Next, let's create and add a custom middleware and for that we'll need to create two more folders: "logs" (because our server needs to be able to log some events like errors or possibly requests) and "middleware" (where we'll have our custom middlewares at). It's also quite good idea to add "logs" folder to ".gitignore" file because we don't really want to send those logs up to GitHub.
// (Go to [middleware/logger.js])

// 2.0.1 And we already added one piece of middleware that we didn't discuss and that's the built-in middleware "express.static" that's telling our server where to grab static files. I was here explicit when I put this in by giving a root route and the exact path to the folder "public", but you might see this used without quite so much explicit information you can also do. I'll give you an example, let's rewrite this here. And this would still work because it's relative to where our server file is (or "index" or whatever you name you main file). ↑
// app.use("/", express.static(path.join(__dirname, "public")));
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

// 2.4.4 So, now, after it's ready-to-use, we can add that custom middleware "errorHandler" here as well. But unlike the "logger" we'll use it at the very end right before we tell our server to start listening. ↑
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));