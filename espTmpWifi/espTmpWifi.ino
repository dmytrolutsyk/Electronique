#include <Wire.h>
#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h> // to serialize post data

#include "DHT.h"

#define DHTPIN D3
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* ssid     = "ESGI"; //wifi id
const char* password = "Reseau-GES"; //w wifi password

//const char* host = "https://findandtrade.herokuapp.com/";
//const uint16_t port = 80;
const unsigned long long interval = 1000;

HTTPClient http;

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
  
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    Serial.print("Humidité : ");
    Serial.println(humidity);

    Serial.print("Temperature : ");
    Serial.println(temperature);
    delay(interval);


    http.begin("http://10.33.3.10:3000/weather");
    //http.begin("https://findandtrade.herokuapp.com/users");
    //http.begin("https://jsonplaceholder.typicode.com/users/1");
    Serial.println("laaaaaaa");
    http.addHeader("Content-Type", "application/json");
    
    DynamicJsonDocument doc(1024);
    doc["humidity"] = humidity;
    doc["temperature"]  = temperature;
    String json;
    serializeJson(doc, json);
    int httpResponseCode = http.POST(json);
    //int httpResponseCode = http.GET(); // get data on api
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();

    // Close the connection
    Serial.println();
    Serial.println("closing connection");
  
    delay(30000); // execute once every 5 minutes, don't flood remote service


}
