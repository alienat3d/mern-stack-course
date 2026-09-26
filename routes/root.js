// 1.2.1 In this file we'll define Express.js once again and then create a router with the "express.Router" function.
const express = require("express");
const router = express.Router();
const path = require("path");

// 1.2.2 And then, we'll use "get" method to create a "GET"-request and what is nice about Express.js and its route-methods that they recognize RegEx, and we'll gladly use it here to say: "^" (at the beginning of the string only), then "/" and "$" (at the end of the string only), meaning that it will only match if the requested route is only "/" that would be for the root. Then, it goes with "|" (means "or" for RegEx), then it will be "index", because maybe they would request more than just "/" as they put that in. And in the end we'll put "(.html)?" (which means ".html" is optional). So, "/" or "/index" or even "/index.html" all should work with that RegEx.
// 1.2.3 Next, as the second argument we'll have an anonymous function that accepts "req" & "res" (which are request & response).
router.get("^/$|/index(.html)?", (req, res) => {
  // 1.2.4 Then, inside the function, we'll send the file back and use the "path.join" method again. To write the path to the file, we'll need to use "__dirname" first to indicate the folder containing the file. Then, ".." will bring us one level up from the "routes" folder. Next, "views" will bring us to the "views" folder, where we'll look for "index.html."
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;