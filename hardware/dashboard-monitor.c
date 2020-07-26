#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <limits.h>
#include <wiringPi.h>

#define motionPin 1

void hdmi(int);

int hdmiState = 1;

int main(void) {
	chdir("/home/pi/Documents/dashboard");
	char cwd[PATH_MAX];
	getcwd(cwd, sizeof(cwd));
	
	wiringPiSetup();
	
	pinMode(motionPin, INPUT);
	pullUpDnControl(motionPin, PUD_DOWN);
	
	while(1) {
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
