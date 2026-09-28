// 3.3.0 We also need to create a "Note" model for the notes. And we could basically copy-paste the previous "User" model here, as it will have a pretty similar structure.
const mongoose = require("mongoose");

// 3.3.3 Yet, we need the ticket number for the note and really there will be an automatically created "ObjectId" with every record and that's what we're referencing here for the "user" and the note will have one too, but as you may see this as we work through the MongoDB's ObjectIds are very long strings, and it wouldn't be too practical to use that for a ticket number. And in fact what we want here is a sequential ticket number and let's start it, say, from 1000, so that it doesn't seem like the shop just opened up. So, every note created should be in a sequence of ticket numbers. We can do that once again by installing a library that will help us ("npm i mongoose-sequence"). So this library will help us issue tickets in a sequence. Then, we'll define "AutoIncrement" where we import that library at. ↓
const AutoIncrement = require("mongoose-sequence")(mongoose);

// 3.3.1 Once again, to define the schema let's refer to the "UserStories.md" and what is written at #10, #11 and #12: "Notes are assigned to specific users", "Notes have a ticket #, title, note body, created & updated dates" and "Notes are either OPEN or COMPLETED". So, let's start with the "user" field, and we know it needs to refer back to the users that we have. Now, this data type is going to be different, than just data type we used before. We'll be using "mongoose.Schema.Types.ObjectId" to refer to other schema we've created. Or better said we're referring here to the type "ObjectId" from a schema, and we need to add a third field to this object which is "ref" and this is where we're referring exactly to which schema — in our case "User" schema.
const noteSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    title: {type: String, required: true},
    text: {type: String, required: true},
    completed: {type: Boolean, default: false},
  },
  // 3.3.2 As we have the timestamps in this model, we'll need to add and set this option "timestamps" to true. And only by setting this MongoDB will actually give us both "createdAt" and "updatedAt" timestamps. ↑
  {timestamps: true});

// 3.3.4 Next, under the schema we'll call "plugin" to the schema and pass "AutoIncrement" to it. We'll also set some options to it as the second argument. "inc_field" is that how it should be named, and we'll call it "ticket". Well, this will create "ticket" field inside our "Note" schema and that will get the sequential number too. It also gets an "id" called "ticketNums", but we won't see this in our "notes" collection actually, what will happen is a separate collection named "counter" will be created, and we'll see that "id" inside the "counter" collection. Then, we also need to tell it what number to start the tickets at, so we'll say set "start_seq" (stands for "start sequence" here) for 1000 here. And that's all what we need to do here. Once users start creating notes, this plugin "AutoIncrement" will create a separate collection called "counter" where it tracks this sequential number and continues insert it into each next note. After we're finished creating the data models we're now ready to create a connection to MongoDB, and we'll create another file [dbConn.js] (from "database connection") for that.
// (Go to [config/dbConn.js])
noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1000
});

module.exports = mongoose.model("Note", noteSchema);