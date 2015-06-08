#include <DHT.h>

DHT dht;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.setup(8);
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(dht.getMinimumSamplingPeriod());
  
  Serial.print(dht.getTemperature());
  Serial.print("|");
  Serial.print(dht.getHumidity());
  Serial.print("\n");
}
