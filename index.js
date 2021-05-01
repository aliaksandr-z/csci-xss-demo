var express = require("express");
var Datastore = require("nedb");

var app = express();
var PORT = 3001;

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
// database.insert({ title: "New post 123", body: "This is a new post" });

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

app.post("/api", function (request, response) {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/api", function (request, response) {
  database
    .find({})
    .sort({ timestamp: 1 })
    .exec(function (err, data) {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
});

app.get("/search", function (request, response) {
  // http://localhost:3001/search?title=hello&body=hello
  // http://localhost:3001/search?title=hello

  const title = request.query.title;
  const body = request.query.body;

  console.log("title:", title);
  console.log("body:", body);
  console.log(request.originalUrl);

  database
    .find({ $or: [{ title: title }, { body: body }] })
    .sort({ timestamp: 1 })
    .exec(function (err, data) {
      if (err) {
        response.end();
        return;
      }
      response.json(data);
    });
});
