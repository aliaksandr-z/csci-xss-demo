const { request } = require("express");
var express = require("express");
var app = express();
var PORT = 3001;

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

app.post("/api", function (request, response) {
  console.log(request.body);
  response.json({
    title: request.body.title,
    body: request.body.body,
  });
});
