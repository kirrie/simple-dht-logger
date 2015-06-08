// define serialport
var SERIALPORT = require('serialport');
var SerialPort = SERIALPORT.SerialPort;
var serialport = new SerialPort('/dev/ttyACM0', {
	parser: SERIALPORT.parsers.readline('\n')
});

// data collector
var COLLECT_INTERVAL = 300;
var data_buffer = (function() {
	var temperature = [], humidity = [];

	return {
		set_temperature: function(t) {
			temperature.push(t);
		},
		set_humidity: function(h) {
			humidity.push(h);		
		},
		get_temperature: function() {
			if(temperature.length === 0) {
				return 0;
			} else {
				var total = 0, i = 0, max = temperature.length;

				for(; i < max; i++) {
					total += parseInt(temperature[i], 10);
				}

				temperature = [];

				return total / max;
			}
		},
		get_humidity: function() {
			if(humidity.length === 0) {
				return 0;
			} else {
				var total = 0, i = 0, max = humidity.length;

				for(; i < max; i++) {
					total += parseInt(humidity[i], 10);
				}

				humidity = [];

				return total / max;
			}
		}
	}
})();

// mysql
var mysql = require('mysql');
var make_insert_query = function(data) {
	var fields = [], values = [];

	for(var key in data) {
		fields.push(key);
		values.push(data[key]);
	}

	return 'INSERT INTO dht (' + fields.join(',') + ') VALUES (' + values.join(',') + ')';
};

// moment
var moment = require('moment');

serialport.open(function(error) {
	if(error) {
		console.log('failed to open: ' + error);
	} else {
		console.log('serial port opened.');

		serialport.on('data', function(data) {
			var splited_data = data.split('|');
			
			data_buffer.set_temperature(splited_data[0]);
			data_buffer.set_humidity(splited_data[1]);
		});
	}
});

setInterval(function() {
	var db_connection = mysql.createConnection({
		host: 'localhost',
		user: 'dht',
		password: 'dht',
		database: 'dht_log'
	});

	db_connection.connect(function(error) {
		if(error) {
			console.log('error db connecting');
			console.error(error);
			return;
		}

		db_connection.query(make_insert_query({
			temperature: data_buffer.get_temperature(),
			humidity: data_buffer.get_humidity(),
			year: moment().year(),
			month: moment().month() + 1,
			date_of_month: moment().date(),
			day_of_week: moment().day(),
			hour: moment().hour(),
			created_at: moment().format('X')
		}), function(error) {
			if(error) {
				console.log('error db insert');
				console.error(error);
			}

			db_connection.end();
		});
	});
}, COLLECT_INTERVAL * 1000);
