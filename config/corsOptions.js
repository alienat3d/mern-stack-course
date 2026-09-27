// 2.6.4 And here we'll import "allowedOrigins" first, then we'll create an object with the options. Remember, it's a 3rd party middleware, so we're just following the rules they've set up for their options. And this is like a lookup object, where we have the "origin" method here, and it receives "origin" and "callback".
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    // 2.6.5 Then, inside of that method we'll check the "allowedOrigins" array with "indexOf" and "origin" inside, and we'll be checking if it's not equal "-1". Now, this would limit it to where only those in the array origins would be able to access our backend REST API. But then that would screen out other software like "Postman" we might test or possibly desktop applications, or anything else that didn't provide an origin, so we must take this in consideration too and add "|| !origin" too. So, if the check passed we'll call that "callback" function and pass "null" as the first argument in it, as it's an error object and we don't have an error. The second argument will be "allowed" boolean, and as we know its successful so we set it to true.
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      // 2.6.6 So, if check fails we'll use the same "callback" function, but will be passing in "new Error" constructor as first argument and false, as second, because the origin isn't allowed by our "allowedOrigins" list.
      callback(new Error('Not allowed by CORS!'), false);
    }
  },
  // 2.6.7 There's also some other options we can set inside "corsOptions" such as "credentials" which we set here to true. This will set the access control allow credentials header, and if you remember "Node.js for beginners" course, we were creating separate middleware to set that header, which is kind of taking the long way around, but we learned a little more. But here we're just setting this option to true, and it handles that header for us.
  credentials: true,
  // 2.6.8 Another option is "optionsSuccessStatus" which we set to 200, by default it's 204, but some devices have problem with that, so to play safe is better to set it manually to 200.
  // (Go to [server.js])
  optionsSuccessStatus: 200
};

module.exports = corsOptions;