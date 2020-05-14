#!/bin/bash
for SERIAL in $(adb -H host.docker.internal devices | grep -v List | cut -f 1);
    do adb -H host.docker.internal -s $SERIAL install -r /home/appium/apps/ApiDemos-debug.apk;
    done