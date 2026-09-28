// 3.2.1 First, we'll need to import the "Mongoose" here.
const mongoose = require("mongoose");

// ? 3.2.2 Second, we'll need to create a schema that will allow us to have a data model. So, inside of that we'll have to think about the different types of data that a user needs to store. Let's check the [UserStories.md] file quickly to look at some points of it to get an idea of what data user needs. Of course, we definitely need as username and a password here, but let's talk about the rest. For example, the #13 says "Users can be Employees, Managers, or Admins" and also #9 says "Provide a way to remove user access ASAP if needed" and #10 says "Notes are assigned to specific users". So, considering all that we need to give an "active" status and that means user might be assigned to different nodes, and we wouldn't want to delete a user if they still have notes assigned to them. So, what we can do is disable a user by having an "active" status (basically boolean data). If they're active — true and if not — false, and that will allow the admin or manager to remove user access ASAP if needed.
// 3.2.3 Now that we've figured that out, let's define the data model for users. First is "username," which is an object consisting of a data type and a value of "String." Then, it has "required" with a boolean value set to true. We'll have the same object with the same fields for the "password" field too. Next, we'll have a "roles" field, which needs to be an array of objects. Instead of "required," we'll set the default value to "Employee" for the first object. This means that if a role is not assigned in our front-end app when a user is created, the default role of "Employee" will be assigned. This indicates that a user may have more than one role, and more than one value can be stored in the array. Next, we'll have an "active" field for the user's status. The type should be Boolean, with the default set to true. When we create a new employee, they should be active immediately, without us needing to send that data to the API. This will allow any new user to be active automatically.
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  roles: [{type: String, default: "Employee"}],
  active: {type: Boolean, default: true},
});

// 3.2.4 To export that model we'll use "mongoose.model" method and pass as arguments the name and schema itself in it.
// (Go to [models/Note.js])
module.exports = mongoose.model("User", userSchema);