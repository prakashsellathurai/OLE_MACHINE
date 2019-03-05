#include <ESP8266WiFi.h>

const char* WIFI_SSID = "Sri Sai Kripa";
const char* WIFI_PASSWORD = "mythraye";
void setup()
{
  initiateWifiConnection ();
}

void loop() {}

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
