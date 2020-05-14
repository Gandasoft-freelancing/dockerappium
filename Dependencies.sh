#!/bin/bash
echo "####INSTALLING NODE####"
apt-get update -y
apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install g++ build-essential -y && \
    apt-get -qqy install nodejs -y && \
    npm install -g appium --unsafe-perm=true --allow-root && \
    npm cache clean && \
    apt-get remove --purge -y npm && \
    apt-get autoremove --purge -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get clean &&\
    apt-get -qqy gcc g++ make

echo "####TESTING IF NODE IS INSTALLED###"

rm -rf ~/.npm
# In the project folder:
rm -rf node_modules
rm -f package-lock.json
npm install npm@latest
node --version
npm install
npm install --save-dev cucumber
echo "###TESTING NPM VERSION#####"
npm --version

echo "####INSTALL JAVA###"
apt-get -qqy update && \
    apt-get -qqy --no-install-recommends install -y &&\
    apt-get install openjdk-11-jre openjdk-11-jdk -y &&\
    ca-certificates \
    tzdata \
    zip \
    unzip \
    curl \
    wget \
    libqt5webkit5 \
    libgconf-2-4 \
    xvfb \
    gnupg \
    salt-minion \
  && rm -rf /var/lib/apt/lists/*
echo "###TESTING JAVA###"
java -version

echo "####done####"
