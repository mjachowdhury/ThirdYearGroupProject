#define CUSTOM_SETTINGS
#define INCLUDE_INTERNET_SHIELD
#define INCLUDE_GPS_SHIELD
#define INCLUDE_TERMINAL_SHIELD
#define INCLUDE_VOICE_RECOGNIZER_SHIELD
#define INCLUDE_TEXT_TO_SPEECH_SHIELD
#define INCLUDE_CLOCK_SHIELD

#include <OneSheeld.h>

HttpRequest latitudeRequest("https://gprojectal.firebaseio.com/location/l/latitude.json");
HttpRequest longitudeRequest("https://gprojectal.firebaseio.com/location/l/longitude.json");

/*int hour,minute;
char hour_char;
int ledPin = 13;
char minute_char;
const char theTime[] = "what time is it";
*/
float latitude;
float longitude;
char latitude_char[10];
char longitude_char[10];     
const char myCoordinates[]= "what is my location";

void setup() {
  OneSheeld.begin();
 // Clock.queryDateAndTime();
 // pinMode(ledPin,OUTPUT);
  latitudeRequest.setOnSuccess(&onSuccess);
  latitudeRequest.getResponse().setOnError(&onResponseError);
  
  longitudeRequest.setOnSuccess(&onSuccess);
  longitudeRequest.getResponse().setOnError(&onResponseError);
  
  Internet.setOnError(&onInternetError); 
  VoiceRecognition.start();

}
 
void loop()
{    
  hour = Clock.getHours(); 
  minute = Clock.getMinutes();

  hour_char = hour +'0';
  minute_char = minute + '0';

  latitude = GPS.getLatitude(); 
  longitude = GPS.getLongitude();
    
  dtostrf(latitude, 8,4, latitude_char);
  dtostrf(longitude, 8, 4, longitude_char);
    
  Terminal.println(latitude_char);
  Terminal.println(longitude_char);
  
  latitudeRequest.addRawData(latitude_char);
  longitudeRequest.addRawData(longitude_char);
  Internet.performPut(latitudeRequest);
  OneSheeld.delay(5000);
  Internet.performPut(longitudeRequest);  
  // delay to let the server take time to get the data
  OneSheeld.delay(5000);

  if(VoiceRecognition.isNewCommandReceived())
  {
    if(!strcmp(myCoordinates,VoiceRecognition.getLastCommand()))
    {
      TextToSpeech.say("Your latitude position is ");
      delay(1000);
      TextToSpeech.say(latitude_char);
      delay(2000);
      TextToSpeech.say("Your longitude position is ");
      delay(1000);
      TextToSpeech.say(longitude_char); 
    }
    else if(!strcmp(theTime,VoiceRecognition.getLastCommand()))
    {
      TextToSpeech.say("The time is " + hour_char + minute_char );
      delay(1400);
    }
/*    else if(!strcmp(theWeather,VoiceRecognition.getLastCommand())
    {
      textToSpeech.say("Today is " + );
    }
    */
  }
  

}
void onSuccess(HttpResponse & response)
{
  //digitalWrite(ledPin,HIGH);
  Terminal.println("Succeeded");
}
 
/* Error handling functions. */
void onResponseError(int errorNumber)
{
  /* Print out error Number.*/
  Terminal.print("Response error:");
  switch(errorNumber)
  {
    case INDEX_OUT_OF_BOUNDS: Terminal.println("INDEX_OUT_OF_BOUNDS");break;
    case RESPONSE_CAN_NOT_BE_FOUND: Terminal.println("RESPONSE_CAN_NOT_BE_FOUND");break;
    case HEADER_CAN_NOT_BE_FOUND: Terminal.println("HEADER_CAN_NOT_BE_FOUND");break;
    case NO_ENOUGH_BYTES: Terminal.println("NO_ENOUGH_BYTES");break;
    case REQUEST_HAS_NO_RESPONSE: Terminal.println("REQUEST_HAS_NO_RESPONSE");break;
    case SIZE_OF_REQUEST_CAN_NOT_BE_ZERO: Terminal.println("SIZE_OF_REQUEST_CAN_NOT_BE_ZERO");break;
    case UNSUPPORTED_HTTP_ENTITY: Terminal.println("UNSUPPORTED_HTTP_ENTITY");break;
    case JSON_KEYCHAIN_IS_WRONG: Terminal.println("JSON_KEYCHAIN_IS_WRONG");break;
  }
}
 
void onInternetError(int requestId, int errorNumber)
{
  /* Print out error Number.*/
  Terminal.print("Request id:");
  Terminal.println(requestId);
  Terminal.print("Internet error:");
  switch(errorNumber)
  {
    case REQUEST_CAN_NOT_BE_FOUND: Terminal.println("REQUEST_CAN_NOT_BE_FOUND");break;
    case NOT_CONNECTED_TO_NETWORK: Terminal.println("NOT_CONNECTED_TO_NETWORK");break;
    case URL_IS_NOT_FOUND: Terminal.println("URL_IS_NOT_FOUND");break;
    case ALREADY_EXECUTING_REQUEST: Terminal.println("ALREADY_EXECUTING_REQUEST");break;
    case URL_IS_WRONG: Terminal.println("URL_IS_WRONG");break;
  }
}
 
