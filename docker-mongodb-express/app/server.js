let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let app = express();

// These values are taken from the environment values within the DOCKER COMPOSE file. 
// Express.js CANNOT get natively get values from .env files, requires a package like dotenv.
// Here, DOCKER COMPOSE grabs the values from .env, and we then grab the value from DOCKER COMPOSE via process.env
const DB_USER = process.env.MONGO_DB_USERNAME;
const DB_PASS = process.env.MONGO_DB_PWD;

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

// when starting app locally, use "mongodb://admin:password@localhost:27017" URL instead
// This is Format for the DATABASE CONNECTION STRING FOR MONGO.
let mongoDBConnectionString = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;
console.log(`mongodb://${DB_USER}:${DB_PASS}@mongodb`);
// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// the following db and collection will be created on first connect
let databaseName = "my-db";
let collectionName = "my-collection";

app.get("/fetch-data", function (req, res) {
	let response = {};
	MongoClient.connect(mongoDBConnectionString, mongoClientOptions, function (err, client) {
		if (err) throw err;

		let db = client.db(databaseName);
		//NOTE - Will need to create a database called "my-db" with collectionname "my-collection" and a new document with a new key "KeyId: 1" and a new value as "data:"my data value". Must be "data", cannot be any other name for value.
		let myquery = { keyId: 1 };
		console.log(myquery);
		console.log(db);

		db.collection(collectionName).findOne(myquery, function (err, result) {
			if (err) throw err;
			response = result;
			console.log(response);
			client.close();

			// Send response
			res.send(response ? response : {});
		});
	});
});

app.listen(3000, function () {
	console.log("app listening on port 3000!");
});
