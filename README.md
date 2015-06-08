# Simple DHT Logger
node.js와 Raspberry, Arduino를 이용한 온습도 센서 로깅 및 HTML 그래프 페이지.

# 필요한 것들
* 하드웨어
 * Raspberry
 * Arduino
  * Bread board (빵판)
  * DHT11 온습도 센서 (혹은 호환 가능한 다른 온습도 센서)
  * 온습도 센서 스펙 문서에 기록된 저항 (RHT-01 온습도 센서의 경우 1/2W 5% 1Kohm 저항을 사용)
  * 각종 전선들
* 소프트웨어
 * node.js (가급적 최신 버전을 사용)
 * [Arduino DHT Library](https://github.com/markruys/arduino-DHT)

# 사전 준비
* Arduino DHT Library를 적당한 폴더에 복사
* /arduino/dht.ino 소스를 Arduino editor를 이용해 Arduino에 업로드
* /schema.sql을 이용해 mysql table 생성
* /dht-logger.js의 86~89라인의 mysql 접속 정보를 본인의 것으로 수정
* /dht-server.js의 3~6라인의 mysql 접속 정보를 본인의 것으로 수정
* Arduino와 Raspberry를 USB로 연결

# 회로 연결
## Bread board
![Bread board](https://github.com/kirrie/simple-dht-logger/raw/master/bread-board.jpg "Bread board")

## Arduino
![alt text](https://github.com/kirrie/simple-dht-logger/raw/master/arduino.jpg "Arduino")
> Data pin은 8번을 사용하는 것으로 가정

# 인스톨 방법
    > npm install
    > npm install forever -g

# 실행 방법
    > forever start dht-logger.js
    > forever start dht-server.js

# Highchart 재배포 라이센스 안내 (Highchart Redistribution)
This source includes [highchart](http://highchart.com). 
