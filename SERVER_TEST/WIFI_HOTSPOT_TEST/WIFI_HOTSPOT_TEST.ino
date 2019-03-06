#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

const char *ssid = "test";
const char *password = "password";
 
IPAddress  apIP(42, 42, 42, 42);  // Defining a static IP address: local & gateway
                                    // Default IP in AP mode is 192.168.4.1
// Define a web server at port 80 for HTTP                         
ESP8266WebServer server(80);

void handleRoot() {
 char liveSensordata = random(0,100000);
 String html = prepareHtmlPage(liveSensordata);
 
 server.send(200, "text/html",html);

}
String prepareHtmlPage(char liveSensordata)
{
  String htmlPage =
     String("HTTP/1.1 200 OK\r\n") +
            "Content-Type: text/html\r\n" +
            "Connection: close\r\n" +  // the connection will be closed after completion of the response
            "Refresh: 5\r\n" +  // refresh the page automatically every 5 sec
            "\r\n" +
            "<!DOCTYPE HTML>" +
            "<html>" +
            "Analog input:  " + String(liveSensordata)+
            "</html>" +
            "\r\n";
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

server.handleClient();

}
