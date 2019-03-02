/*
INDUCTION PROXIMITY SENSOR TEST :)
*/
float metalDetected;
int monitoring;
int metalDetection = A0;
 
void setup(){
Serial.begin(9600);
}
 
void loop(){
monitoring = analogRead(metalDetection);
metalDetected = 100 - (float) monitoring*100/1024.0;
Serial.print("metalDetected : ");
Serial.print(metalDetected);
Serial.print("%\n");
delay(500);

}
