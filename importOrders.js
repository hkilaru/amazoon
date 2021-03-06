var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var csv = require("csv");

//
// `params` reads options from the command line (via minimist).
//
// Try console logging it when experimenting with different
// command line options.
//
var params = require("minimist")(process.argv.slice(2));

var ORDERS_FILENAME		 = (params.from || "data/orders.csv");
var DB_FILENAME 			 = (params.to || "data/amazoon.db");
var DB_SCHEMA_FILENAME = "amazoon.sql";

var dbSchema = fs.readFileSync(DB_SCHEMA_FILENAME,{ encoding: "utf-8" });
var db = new sqlite3.Database(DB_FILENAME,onConnected);

//
// TODO: print some help text to let the CLI user know how to
//       use this tool


// ************************************

function onConnected(err) {
	if (err) {
		console.log("Database connection error.",err.toString());
		return;
	}

	// This sets database to serialized mode, which causes
	// the library to run each query sequentially
	// (as opposed to running them all in parallel).
	db.serialize();

	//
	// TODO: 3 steps to take, all asynchronous:
	//

	// 1. Initialize database schema
	//    For example: db.exec( dbSchema )

	// 2. Parse the CSV
	//    The `parseCSV` function will be helpful;
	//		it should return useful objects / arrays.
	//	  Feel free to modify the code as you need to.

	// 3. Insert the data into your SQL database.
	//    Tips:
	//
	//    // To INSERT:
	//    db.run( " ..SQL.. ", function(err){
	//
	//    })
	//
	//    // to SELECT:
	//    db.get( " ..SQL.. ", function(err){
	//
	//    })
	//
	//    // to SELECT and iterate:
	//    db.each( " .. SQL.. ", function(err, row){
	//
	//    })
}

function parseCSV() {
	var file = fs.createReadStream(ORDERS_FILENAME);
	var parser = csv.parse({
		columns: true,
		auto_parse: true
	});

	file.pipe(parser);

	parser.on("readable",function(){
		var record;
		while (record = parser.read()) {
			//
			// `record` is an object representing a row of the CSV file.
			//  Console log it to see what it looks like.
			//
		}
	});
}
