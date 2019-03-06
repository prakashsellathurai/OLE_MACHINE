#include <ESP8266WiFi.h>

#define WIFI_SSID  "ugb"
#define WIFI_PASSWORD  "gvj"

WiFiServer server(80);

void setup()
{
  initiateWifiConnection ();
}

void loop() { MainServerThread ();}

// utilities
void initiateWifiConnection () {
    Serial.begin(115200);
  Serial.println();
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
  }

  void MainServerThread () {
  char liveSensordata = random(0,100000);

    }
    String prepareHtmlPage()
{
  String htmlPage =
     String("HTTP/1.1 200 OK\r\n") +
            "Content-Type: text/html\r\n" +
            "Connection: close\r\n" +  // the connection will be closed after completion of the response
            "Refresh: 5\r\n" +  // refresh the page automatically every 5 sec
            "\r\n" +
            "<!DOCTYPE HTML>" +
            "<html>" +
            "Analog input:  " + String(random(0,100))+
            "</html>" +
            "\r\n";
  return htmlPage;
}
