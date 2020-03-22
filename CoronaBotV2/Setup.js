var config = require('./config');
var mysql = require('mysql');
var secret = require("./secret");
if(config.dbreaduserhost == "example.com"){
	console.log("I´m sorry. You need to fill out config.json first!");
}else{
var db = mysql.createPool({
	connectionLimit : 100,
	host: config.dbreaduserhost,
	user: config.dbreaduser,
	password: secret.dbreaduserpwd,
	charset : 'utf8mb4'
});
//MySQL Syntax
let sqlcmd = "CREATE DATABASE IF NOT EXISTS " + config.database + ";";
let sqlcmdtable = "CREATE TABLE IF NOT EXISTS `Bundesländer` (`TimeStamp` DOUBLE NOT NULL,`Baden-Württemberg` varchar(255), `Bayern` varchar(255), `Berlin` varchar(255), `Brandenburg` varchar(255), `Bremen` varchar(255), `Hamburg` varchar(255), `Hessen` varchar(255), `Mecklenburg-Vorpommern` varchar(255), `Niedersachsen` varchar(255), `Nordrhein-Westfalen` varchar(255), `Rheinland-Pfalz` varchar(255), `Saarland` varchar(255), `Sachsen` varchar(255), `Sachsen-Anhalt` varchar(255), `Schleswig-Holstein` varchar(255), `Thüringen` varchar(255), `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`TimeStamp`));";

//Create DB
db.getConnection(function(err, connection){
	console.log("Connected to " + config.dbreaduserhost);
	connection.query(sqlcmd, function(err, result){
                if(err) throw err;
				console.log("Database " + config.database + " created");
                });
                connection.release();
});
//Create Table
db.getConnection(function(err, connection){
	connection.query("USE " + config.database + ";", function(err, result){
		console.log("DB switched " + config.database);
		connection.query(sqlcmdtable, function(err, result){
                if(err) throw err;
				console.log("Table users created\n\nDone!");
        });
    	connection.release();
	});
});
}