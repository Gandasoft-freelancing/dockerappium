#!/bin/bash
echo "####INSTALLING NODE####"
apt-get update -y
apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get -qqy install nodejs && \
    npm install -g appium --unsafe-perm=true --allow-root && \
    exit 0 && \
    npm cache clean && \
    apt-get remove --purge -y npm && \
    apt-get autoremove --purge -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get clean &&\
    apt-get -qqy gcc g++ make

echo "####TESTING IF NODE IS INSTALLED###"
node --version
echo "###TESTIMNG NPM VERSION#####"
npm --version

echo "####INSTALL JAVA###"
RUN apt-get -qqy update && \
    apt-get -qqy --no-install-recommends install &&\
    apt-get install openjdk-11-jre openjdk-11-jdk &&\
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
echo "###INSTALL ANDROID STUDIO SDK PREREQUISITES###"
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386 -y

