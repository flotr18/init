const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const path = require("path"); //to join path between files
const server = express();
// the value for dbname should match your database name
const dbname = "asperger";

server.use(express.static(path.join(__dirname + "/../../build"))); // I ran "npm run build", it will give me 'build' folder
// Your server is in src/serer, so to server 'build' we have to go out server then src to reach to 'build'

const dbroute =
  process.env.MONGODB_URL ||
  "mongodb+srv://admin:root@cluster0.elh7n.mongodb.net/test?retryWrites=true&w=majority";

let db;

MongoClient.connect(dbroute, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  db = client.db(dbname);
  server.listen(process.env.PORT || 3000, () =>
    console.log(`Listening on port ${process.env.PORT || 3000}!`)
  );
  console.log("Connected to mongo!");
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post("/", (req, res) => {
  db.collection("contact").insertOne(req.body, (err, result) => {
    if (err) throw err;
    console.log(req.body);
    console.log("created in database");
    res.redirect("/");
  });
});
