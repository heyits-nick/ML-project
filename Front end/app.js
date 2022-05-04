var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/heartml.mlproj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
  var age = req.body.age;
  var sex = req.body.sex;
  var cp = req.body.cp;
  var bp = req.body.bp;
  var chol = req.body.chol;
  var fbs = req.body.fbs;
  var recg = req.body.recg;
  var maxhr = req.body.maxhr;
  var eia = req.body.eia;
  var op = req.body.op;
  var slop = req.body.slop;
  var cap = req.body.cap;
  var thal = req.body.thal;

  var data = {
    age: age,
    sex: sex,
    cp: cp,
    trestbps: bp,
    chol: chol,
    fbs: fbs,
    restecg: recg,
    thalach: maxhr,
    exang: eia,
    oldpeak: op,
    slope: slop,
    ca: cap,
    thal: thal,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on PORT 3000");

//var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

//var app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.resolve(__dirname, 'public')));

//app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
