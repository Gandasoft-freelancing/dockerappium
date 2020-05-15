# Appium docker container setup using docker
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
 # Appium setup using docker-compose
 1. Make sure you have [docker-compose!](https://docs.docker.com/compose/install/) installed and make sure you have adb installed and running on your host otherwise the adb will give you some weird error about protocol*trust me you dont want that*
 2. clone the repository and cd into the directory 
 3. Run `docker-compose build` to build the project
 4. Run `docker-compose up -d` to run the container
 5. Run `docker-compose ps` to get the container name
 6. Run `docker exec appiumtest bash` to run container terminal
 7. This takes you inside the container you can then start running your test case commands to the emulators(*remember to use the -H host.docker.internal flag after adb whenever you are running adb commands in order to send commands to devices on the host*)