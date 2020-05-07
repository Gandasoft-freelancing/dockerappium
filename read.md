# Appium docker setup
1. Clone this repository
2. `cd dockerappium`
3. Run `docker build . i appium-test:latest`
4. Run `docker run  -it -p 4723:4723 --name appium_container appium-test:latest ` this creates a container named<br> appium_container  and exposes the port 4723
5. Test if the container has appium running by going to http://localhost:4723 on your machine
6. Check the container output you should see a confirmation that it recieved a request.
##More to be added in sprint two