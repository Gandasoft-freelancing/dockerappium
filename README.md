# Appium docker setup
1. Clone this repository
2. `cd dockerappium`
3. Run `docker build . i appium-test:latest`
4. Run `docker run  -it -p 4723:4723 -5037:5037 --name appium_container appium-test:latest ` this creates a container named<br> appium_container  and exposes the port 4723
5. Test if the container has appium running by going to http://localhost:4723 on your machine
6. Check the container output you should see a confirmation that it recieved a request.
7. Run `docker exec -it appium_container  /bin/bash`
8. Test if adb is install run `adb --help`
9. Test if java is installed run `java -version`
10. On your host machine spin up a virtual device or connect a real device with usb (**make sure the device has usb debugging enabled**)
11. Run `adb -H host.docker.internal devices`
12. You should see the list of devices connected to your host