#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <limits.h>
#include <wiringPi.h>

#define resetPin 0
#define motionPin 1

void hdmi(int);

int hdmiState = 0;

int main(void) {
	int resetting = 0;
	chdir("/home/pi/Documents/dashboard");
	char cwd[PATH_MAX];
	getcwd(cwd, sizeof(cwd));
	
	wiringPiSetup();
	
	pinMode(resetPin, INPUT);
	pullUpDnControl(resetPin, PUD_DOWN);
	
	while(1) {
		if (resetting == 0 && digitalRead(resetPin) == HIGH) {
			resetting = 1;
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
		system("/opt/vc/bin/tvservice -p");
		hdmiState = 1;
	} else if (!on && hdmiState) {
		system("/opt/vc/bin/tvservice -o");
		hdmiState = 0;
	}
}
