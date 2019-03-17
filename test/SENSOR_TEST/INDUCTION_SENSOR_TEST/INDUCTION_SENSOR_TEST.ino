/*
INDUCTION PROXIMITY SENSOR TEST :)
*/
float metalDetected;
int monitoring;
int metalDetection = 2;
 
void setup(){
Serial.begin(9600);
}
 
void loop(){
Serial.println(getSensorData(metalDetection));

}
int getSensorData (int metalDetection) {
int monitoring = digitalRead(metalDetection);
monitoring = map(monitoring,1,0,0,1); 
return monitoring;
 }
