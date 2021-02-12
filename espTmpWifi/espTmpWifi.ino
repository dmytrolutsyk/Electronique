#include <Wire.h>
#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266WiFiMulti.h>

#include "DHT.h"

#define DHTPIN D3
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

const char* ssid     = "ESGI";
const char* password = "Reseau-GES";

const char* host = "https://findandtrade.herokuapp.com";
const uint16_t port = 80;

const unsigned long long interval = 1000;

void setup() {
  dht.begin();
  Serial.begin(9600);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}

void loop() {

    Serial.println("hello");
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    Serial.print("Humidité : ");
    Serial.println(humidity);

    Serial.print("Temperature : ");
    Serial.println(temperature);
    delay(interval);

    Serial.print("connecting to ");
    Serial.print(host);
    Serial.print(':');
    Serial.println(port);
  
    // Use WiFiClient class to create TCP connections
    WiFiClient client;
    if (!client.connect(host, port)) {
      Serial.println("connection failed");
      delay(5000);
      return;
    }

  /*
    // This will send a string to the server
    Serial.println("sending data to server");
    if (client.connected()) {
      client.println("hello from ESP8266");
    }
  
    // wait for data to be available
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        delay(60000);
        return;
      }
    }
  
    // Read all the lines of the reply from server and print them to Serial
    Serial.println("receiving from remote server");
    // not testing 'client.connected()' since we do not need to send data here
    while (client.available()) {
      char ch = static_cast<char>(client.read());
      Serial.print(ch);
    }*/
    http.begin(host,port,url);
    int httpCode = http.GET();
    if (httpCode) {
      if (httpCode == 200) {
        String payload = http.getString();
        Serial.println("Domoticz response "); 
        Serial.println(payload);
      }
    }
  
    // Close the connection
    Serial.println();
    Serial.println("closing connection");
    client.stop();
  
    delay(300000); // execute once every 5 minutes, don't flood remote service


}
