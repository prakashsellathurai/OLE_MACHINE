#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

const char *ssid = "test";
const char *password = "password";
int count = 0;

IPAddress  apIP(42, 42, 42, 42);  // Defining a static IP address: local & gateway
                                    // Default IP in AP mode is 192.168.4.1
// Define a web server at port 80 for HTTP                         
ESP8266WebServer server(80);

int GetSensorCount () { 
 int liveSensordata = random(0,10);
// count = 0;
 return liveSensordata;
  }
void handleRoot() {
 int liveSensordata = GetSensorCount();
 String html = prepareHtmlPage(liveSensordata);
 String CONTENT_TYPE = "text/plain";
   server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
 server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
 
 server.sendHeader("Access-Control-Allow-Origin","*");
 server.send(200,CONTENT_TYPE,html);

}

  void countPunches () {
    count++;
    }
String prepareHtmlPage(int liveSensordata)
{
  String htmlPage = String(liveSensordata);
  return htmlPage;
}

void setup() {

delay(1000);
Serial.begin(115200);
Serial.println();
Serial.print("Configuring access point...");

//set-up the custom IP address
WiFi.mode(WIFI_AP_STA);
WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));   // subnet FF FF FF 00  
  
WiFi.softAP(ssid, password);

IPAddress myIP = WiFi.softAPIP();

Serial.print("AP IP address: ");
Serial.println(myIP);

server.on("/", handleRoot);
server.begin();
Serial.println("HTTP server started");
}

void loop() {
countPunches();
server.handleClient();

}
