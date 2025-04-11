const { request, response } = require("express");
const express = require("express");
const Datastore = require("gray-nedb");

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.status(500).json({
        error: "Database error",
        details: err.message,
      });
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  if (!data) {
    response.status(400).json({
      error: "Invalid request data",
    });
    return;
  }

  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data, (err, newDoc) => {
    if (err) {
      response.status(500).json({
        error: "Failed to save data",
        details: err.message,
      });
      return;
    }
    response.json(newDoc);
  });
});
