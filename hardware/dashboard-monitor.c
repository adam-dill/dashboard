#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <limits.h>
#include <wiringPi.h>

#define resetPin 0
#define motionPin 1
#define resetLedPin 2

void hdmi(int);

int hdmiState = 1;

int main(void) {
	int resetting = 0;
	chdir("/home/pi/Documents/dashboard");
	char cwd[PATH_MAX];
	getcwd(cwd, sizeof(cwd));
	
	wiringPiSetup();
	
	pinMode(resetPin, INPUT);
	pullUpDnControl(resetPin, PUD_DOWN);
	pinMode(motionPin, INPUT);
	pullUpDnControl(motionPin, PUD_DOWN);
	pinMode(resetLedPin, OUTPUT);
	digitalWrite(resetLedPin, LOW);
	
	while(1) {
		if (resetting == 1) {
			int currentResetLed = digitalRead(resetLedPin);
			digitalWrite(resetLedPin, !currentResetLed);
		}
		if (resetting == 0 && digitalRead(resetPin) == HIGH) {
			resetting = 1;
			digitalWrite(resetLedPin, HIGH);
			// TODO: notify in the display update is occuring.
			system("npm run update");
		}
		int motionSensor = digitalRead(motionPin);
		hdmi(motionSensor);
		sleep(1);
	}
	return 0;
}

void hdmi(int on) {
	if (on && !hdmiState) {
		system("tvservice -p");
		system("xdotool mousemove 100 100 && xdotool click 1");
		hdmiState = 1;
	} else if (!on && hdmiState) {
		system("tvservice -o");
		hdmiState = 0;
	}
}
