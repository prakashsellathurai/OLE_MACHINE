#include <Wire.h>

int metalDetectionPIN = 2;
int16_t currentState = 0;
int16_t previousState = 0;
int count = 0;


int getSensorData (int metalDetectionPIN) {
  int monitoring = digitalRead(metalDetectionPIN);
  monitoring = map(monitoring,1,0,0,1); 
  return monitoring;
 }
int countPunches () {
  currentState = getSensorData(metalDetectionPIN);
  if ( currentState == 0 && currentState != previousState) {
    count++;
    }
    previousState = currentState;
  }

void setup() {
  // put your setup code here, to run once:
   Wire.begin(8);                /* join i2c bus with address 8 */
   Wire.onReceive(receiveEvent); /* register receive event */
   Wire.onRequest(requestEvent); /* register request event */
   Serial.begin(115200);
}

void loop() {
  countPunches();
  Serial.println(count);
  delay(100);
}
// function that executes whenever data is received from master
void receiveEvent(int howMany) {
 while (0 <Wire.available()) {
    char c = Wire.read();      /* receive byte as a character */
    Serial.print(c);           /* print the character */
  }
 Serial.println();             /* to newline */
}

// function that executes whenever data is requested from master
void requestEvent() { 
 int16_t bigNum = count;
byte myArray[2];
 
myArray[0] = (bigNum >> 8) & 0xFF;
myArray[1] = bigNum & 0xFF;
Wire.write(myArray, 2);
count = 0;
}
