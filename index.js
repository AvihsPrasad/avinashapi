var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3200,
    mongoose = require('mongoose');
    routes = require('./routes/route');
var localip = 'http://localhost:' + port;
var path = require('path');

mongoose.Promise = global.Promise;
const mongoAtlasUri =
  "mongodb+srv://kethianilkumar1:Pz1asUqzzafH0sJ6@cluster0.jzurz.mongodb.net/?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api', routes);

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(port, function (){
  console.log('\n-------------------------------------------------------------------------');
  console.log('\x1b[35m' + 'server is running on port or \n' + '\x1b[36m'+ 'http://localhost:' + port + '\n' + '\x1b[36m' + localip +'\x1b[0m');
  console.log('-------------------------------------------------------------------------');
})