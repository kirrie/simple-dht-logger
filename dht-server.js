var mysql = require('mysql'),
	db_info = {
		host: 'localhost',
		user: 'dht',
		password: 'dht',
		database: 'dht_log'
	};

var moment = require('moment');
var express = require('express'),
	app = express();
var dht_router = express.Router();

// static
app.use(express.static('static'));

// route for /dht
// /date
dht_router.get('/date', function(req, res) {
	var year = req.query.year || moment().year(),
		month = req.query.month || moment().month() + 1,
		date_of_month = req.query.date_of_month || moment().date();

	var db_connection = mysql.createConnection(db_info);

	db_connection.connect(function(error) {
		if(error) {
			console.error('error db connecting');
			console.error(error);
			res.send({error: true});
		} else {
			db_connection.query('SELECT DATE_FORMAT(FROM_UNIXTIME(created_at), "%k시 %i분") AS time, temperature, humidity FROM dht WHERE year = ? AND month = ? AND date_of_month = ? ORDER BY id ASC', [year, month, date_of_month], function(error, rows) {
				if(error) {
					console.error('error db query');
					console.error('error');
					res.send({error: true});
				} else {
					res.send({
						error: false,
						result: rows
					});
				}

				db_connection.end();
			});
		}
	});
});

// /hour_average
dht_router.get('/hour_average', function(req, res) {
	var db_connection = mysql.createConnection(db_info);

	db_connection.connect(function(error) {
		if(error) {
			console.error('error db connecting');
			console.error(error);
			res.send({error: true});
		} else {
			db_connection.query('SELECT CONCAT(hour, "시") AS hour, AVG(temperature) AS temperature, AVG(humidity) AS humidity FROM dht GROUP BY hour ORDER BY hour ASC', function(error, rows) {
				if(error) {
					console.error('error db query');
					console.error('error');
					res.send({error: true});
				} else {
					res.send({
						error: false,
						result: rows
					});
				}

				db_connection.end();
			});
		}
	});
});

// /date_average
dht_router.get('/date_average', function(req, res) {
    var db_connection = mysql.createConnection(db_info);

    db_connection.connect(function(error) {
        if(error) {
            console.error('error db connecting');
            console.error(error);
            res.send({error: true});
        } else {
            db_connection.query('SELECT CONCAT(month, "-", date_of_month) AS date_of_month, AVG(temperature) AS temperature, AVG(humidity) AS humidity FROM dht GROUP BY CONCAT(month, date_of_month) ORDER BY id ASC', function(error, rows) {
                if(error) {
                    console.error('error db query');
                    console.error('error');
                    res.send({error: true});
                } else {
                    res.send({
                        error: false,
                        result: rows
                    }); 
                }   

                db_connection.end();
            }); 
        }   
    });
});

app.use('/dht', dht_router);

// app listen to port
app.listen(8080, function() {
	console.log('dht-server.js started.');
});
