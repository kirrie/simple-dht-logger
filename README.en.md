# Simple DHT Logger
Log temperature & humidity using Raspberry, Arduino, node.js AND Show its data in HTML.
([Korean](https://github.com/kirrie/simple-dht-logger/blob/master/README.md))

# What you need
* Hardware
 * Raspberry
 * Arduino
  * Bread board
  * DHT11 temperature & humidity sensor (or compatible sensor)
  * Register that is used by temperature & humidity sensor. (I'm using RHT-01 compatible sensor and that needs 1/2W 5% 1Kohm register)
  * wires.
* Software
 * node.js (the latest version if possible)
 * [Arduino DHT Library](https://github.com/markruys/arduino-DHT)

# Pre-installation
* Copy Arduino DHT Library to <aruduino sketch directory>/libraries/ directory.
* Upload /arduino/dht.ino to Arduino using Arduino IDE.
* Create mysql table using /schema.sql.
* Change 86~89 lines from /dht-logger.js with your database connection enviroment.
* Change 3~6 lines from /dht-server.js with your database connection enviroment.
* Get Arduino connect to Raspberry by USB.

# Circuit
## Bread board
![Bread board](https://github.com/kirrie/simple-dht-logger/raw/master/bread-board.jpg "Bread board")

## Arduino
![alt text](https://github.com/kirrie/simple-dht-logger/raw/master/arduino.jpg "Arduino")
> I'm using Data pin 8.

# How to install
    > npm install
    > npm install forever -g

# How to run
    > forever start dht-logger.js
    > forever start dht-server.js

# Highchart redistribution
This source includes [highchart](http://highchart.com). 
