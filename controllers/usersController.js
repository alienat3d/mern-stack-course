// 4.2.1 Second, we'll need to install and import here two more libraries, those are "express-async-handler" & "bcrypt". We'll need "bcrypt" here to hash the password before we save it, because we don't want to save just a plain text password inside any database. While "asyncHandler" will keep us from using so much "try...catch" blocks as we use async methods with mongoose to save, delete or find data from MongoDB. ↓
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// 4.2.0 First, we'll need to import the "User" & "Note" data models. ↑
const User = require("../models/User");
const Note = require("../models/Note");

// 4.2.2 Now, we'll create a controller functions, and it's common to label those with comments like those below. So, it has a description that says what function does, and it does "Get all users", it's route "/users" with HTTP-method "GET" and finally the access to this route will eventually be private (but we're not setting any authorization right now, as we just want to get REST API up and running, so we can create the frontend, then later we'll come back and lock it all down).
// 4.2.3 So, it will be an asynchronous function that accepts "req" & "res" (stands for "request" & "response"). Notice, there is no "next", as the controller should be the end of the line essentially where we're processing the final data, and we're sending a response back.
// 4.2.4 After we do that, we have to consider something else, "asyncHandler" will keep us from using the "try...catch" blocks and still catch those async errors, but it needs to be wrapped around this function.
// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {

});

// 4.2.5 And before we started to filling in that function with some logic let's copy-paste it and create our "post" request function as well and change the description notes accordingly.
// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {

});

// 4.2.6 So, let's do the same about the functions for "patch" and "delete" requests as well.
// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {

});

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

});

// 4.2.7 Then, we'll have to export all of those controller-functions. Now, all that is left is to create the logic inside all these controller functions, but before we do that let's get back and complete the routes.
// (Go to [routes/userRoutes.js])
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};